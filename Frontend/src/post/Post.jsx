import { makeStyles } from "@mui/styles";
import auth from "../auth/auth-helper";
import { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PropTypes from "prop-types";
import { remove, like, unlike } from "./api-post";
import { Link } from "react-router-dom";
import Comments from "./Comments";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
export default function Post(props) {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const checkLike = (likes) => {
    let match = likes.indexOf(jwt.user._id) !== -1;
    return match;
  };
  const [values, setValues] = useState({
    like: checkLike(props.post.likes),
    likes: props.post.likes.length,
    comments: props.post.comments,
  });

  useEffect(() => {
    setValues({
      ...values,
      like: checkLike(props.post.likes),
      likes: props.post.likes.length,
      comments: props.post.comments,
    });
  }, []);

  const clickLike = () => {
    let callApi = values.like ? unlike : like;
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      props.post._id
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, like: !values.like, likes: data.likes.length });
      }
    });
  };

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };

  const deletePost = () => {
    remove(
      {
        postId: props.post._id,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        props.onRemove(props.post);
      }
    });
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={"/api/users/photo/" + props.post.postedBy._id} />}
        action={
          props.post.postedBy._id === auth.isAuthenticated().user._id && (
            <IconButton onClick={deletePost}>
              <DeleteForeverIcon />
            </IconButton>
          )
        }
        title={
          <Link to={"/user/" + props.post.postedBy._id}>
            {props.post.postedBy.name}
          </Link>
        }
        subheader={new Date(props.post.created).toDateString()}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {props.post.text}
        </Typography>
        {props.post.photo && (
          <div className={classes.photo}>
            <img
              className={classes.media}
              src={"/api/posts/photo/" + props.post._id}
            />
          </div>
        )}
      </CardContent>
      <CardActions>
        {values.like ? (
          <IconButton
            onClick={clickLike}
            className={classes.button}
            aria-label="Like"
            color="secondary"
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={clickLike}
            className={classes.button}
            aria-label="Unlike"
            color="secondary"
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}{" "}
        <span>{values.likes}</span>
        <IconButton
          className={classes.button}
          aria-label="Comment"
          color="secondary"
        >
          <CommentIcon />
        </IconButton>{" "}
        <span>{values.comments.length}</span>
      </CardActions>
      <Divider />
      <Comments
        postId={props.post._id}
        comments={values.comments}
        updateComments={updateComments}
      />
    </Card>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
