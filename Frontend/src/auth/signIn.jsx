import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import signUser from "./api-auth";
import auth from "./auth-helper";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));
export default function SignIn(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });
  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    signUser(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
        navigate("/");
      }
    });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };
  // const { from } = props.location.state || {
  //   from: {
  //     pathname: "/",
  //   },
  // };
  // const { redirectToReferrer } = values;
  // if (redirectToReferrer) {
  //   return <redirect to={from} />;
  // }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Sign In
        </Typography>
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
          onClick={clickSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}

// const SignIn = () => {
//   return <h1>hello there</h1>;
// };
// export default signIn;
