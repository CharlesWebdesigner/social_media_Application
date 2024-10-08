import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Card, Typography, Divider } from "@mui/material";
import auth from "../auth/auth-helper";
import { listNewsFeed } from "./api-post";
import PostList from "./PostList";
import NewPost from "./NewPost";
const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  media: {
    minHeight: 330,
  },
}));
export default function Newsfeed() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]); // posts initialized as an empty array
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listNewsFeed(
      {
        userId: jwt.user._id,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setPosts(data || []); // Ensure data is an array, fallback to empty array
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [jwt.user._id, jwt.token]);

  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };

  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        News feed
      </Typography>
      <Divider />
      <NewPost addUpdate={addPost} />
      <Divider />
      {/* Pass posts safely */}
      <PostList removeUpdate={removePost} posts={posts || []} />
    </Card>
  );
}
