import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { read, update } from "./api-user";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
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
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
}));
export default function EditProfile({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    about: "",
    photo: "",
    email: "",
    password: "",
    redirectToProfile: false,
    error: "",
    id: "",
  });
  const jwt = auth.isAuthenticated();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  }, [match.params.userId]);
  const clickSubmit = () => {
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.password && userData.append("password", values.password);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);
  };
  update(
    {
      userId: match.params.userId,
    },
    { t: jwt.token },
    userData
  ).then((data) => {
    if (data && data.error) {
      setValues({ ...values, error: data.error });
    } else {
      setValues({ ...values, redirectToProfile: true });
    }
  });
  const handleChange = (name) => (event) => {
    const value =
      name === "photo"
        ? event.target.files[0]
        : (event.target.value, setValues({ ...values, [name]: value }));
    const photoUrl = values.id
      ? `/api/users/photo/${values.id}?${new Date().getTime()}`
      : "/api/users/defaultphoto";
  };
  if (values.redirectToProfile) {
    const navigate = useNavigate();
    return navigate("/user" + values.id);
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>
      </CardContent>
    </Card>
  );
}
