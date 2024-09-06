import { AppBar, Button, IconButton, Typography, Toolbar } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import auth from "../auth/auth-helper";

const getActiveStyle = (pathname) => {
  return { color: "#ffa726" };
};

const getInactiveStyle = () => {
  return { color: "#ffffff" };
};

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            MERN Social
          </Typography>
          <Link to="/">
            <IconButton
              aria-label="Home"
              style={
                location.pathname === "/"
                  ? getActiveStyle()
                  : getInactiveStyle()
              }
            >
              <HomeIcon />
            </IconButton>
          </Link>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
                <Button
                  style={
                    location.pathname === "/signup"
                      ? getActiveStyle()
                      : getInactiveStyle()
                  }
                >
                  Sign up
                </Button>
              </Link>
              <Link to="/signin">
                <Button
                  style={
                    location.pathname === "/signin"
                      ? getActiveStyle()
                      : getInactiveStyle()
                  }
                >
                  Sign In
                </Button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button
                  style={
                    location.pathname.startsWith("/user/")
                      ? getActiveStyle()
                      : getInactiveStyle()
                  }
                >
                  My Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => navigate("/signin"));
                }}
              >
                Sign out
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Menu;
