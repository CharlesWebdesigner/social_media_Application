import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import { create } from "./api-user";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  TextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));
export default function signUp() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      password: values.password || undefined,
      email: values.email || undefined,
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Signup
          </Typography>
          <TextField
            id="name"
            label="Name"
            margin="normal"
            className={classes.textField}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="email"
            label="Email"
            margin="normal"
            className={classes.textField}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            margin="normal"
            className={classes.textField}
            onChange={handleChange}
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            className={classes.submit}
            onClick={clickSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button
              color="primary"
              autoFocus="autoFocus"
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
