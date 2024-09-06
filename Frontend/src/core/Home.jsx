import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import unicornbike from "../assets/unicornbike.jpg";
import auth from "../auth/auth-helper";
import { useNavigate } from "react-router-dom";
import FindPeople from "../user/FindPeople";
import Newsfeed from "../post/NewsFeed";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.text.secondary,
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "$ a": {
      color: "#3f4771",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [defaultPage, setDefaultPage] = useState(false);

  useEffect(() => {
    const res = auth.isAuthenticated();
    if (res) {
      setDefaultPage(true);
    } else {
      setDefaultPage(false);
      navigate("/signin");
    }
  }, []);

  return (
    <div className={classes.root}>
      {defaultPage && (
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <Typography variant="h6" className={classes.title}>
                Home Page
              </Typography>
              <CardMedia
                className={classes.media}
                image={unicornbike}
                title="Unicorn Bicycle"
              />
              <Typography
                variant="body2"
                component="p"
                className={classes.credit}
                color="textSecondary"
              >
                Photo by{" "}
                <a
                  href="https://unsplash.com/@boudewijn_huysmans"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Boudewijn Huysmans
                </a>{" "}
                on Unsplash
              </Typography>
              <CardContent>
                <Typography type="body1" component="p">
                  Welcome to the Social Home page.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {defaultPage && (
        <Grid container spacing={8}>
          <Grid item xs={8} sm={7}>
            <Newsfeed />
          </Grid>
          <Grid item xs={6} sm={5}>
            <FindPeople />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
