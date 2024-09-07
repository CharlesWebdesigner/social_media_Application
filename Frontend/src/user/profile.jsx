import { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import EditIcon from "@mui/icons-material/Edit";
import { read } from "./api-user";
import DeleteUser from "./DeleteUser";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  List,
  ListItem,
  Paper,
  Typography,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FollowProfileButton from "./FollowProfileButton";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  title: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: "1em",
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));
export default function Profile({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });
  const [posts, setPosts] = useState([]);
  const jwt = auth.isAuthenticated();
  //   useEffect(() => {
  //     const abortController = new AbortController();
  //     const signal = abortController.signal;
  //     read(
  //       {
  //         userId: match.params.userId,
  //       },
  //       { t: jwt.token },
  //       signal
  //     ).then((data) => {
  //       if (data && data.error) {
  //         setValues({ ...values, redirectToSignin: true });
  //       } else {
  //         let following = checkFollow(data);
  //         setValues({ ...values, user: data, following: following });
  //         loadPosts(data._id);
  //       }
  //     });
  //   }, [match.params.userId]);
  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id == jwt.user._id;
    });
    return match;
  };
  const clickFollowButton = (callApi) => {
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      values.user._id
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, user: data, following: !values.following });
      }
    });
  };
  const loadPosts = (user) => {
    listByUser(
      {
        userId: user,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        // setValues({...values,error:data.error})
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  };
  const removePost = (post) => {
    const updatedPosts = posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const photoUrl = values.user._id
    ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
    : "/api/users/defaultphoto";
  if (values.redirectToSignin) {
    const navigate = useNavigate();
    return navigate("/signin");
  }
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={photoUrl} className={classes.bigAvatar} />
          </ListItemAvatar>
          <ListItemText
            primary={values.user.name}
            secondary={values.user.email}
          />
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == values.user._id}
          ?(
          <ListItemSecondaryAction>
            <Link to={"/user/edit/" + values.user._id}>
              <IconButton aria-label="Edit" color="primary">
                <EditIcon />
              </IconButton>
            </Link>
            <DeleteUser userId={values.user._id} />
          </ListItemSecondaryAction>
          ) :(
          <FollowProfileButton
            following={values.following}
            onButtonClick={clickFollowButton}
          />
          )
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={values.user.about}
            secondary={
              "Joined: " + new Date(values.user.created).toDateString()
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
}
