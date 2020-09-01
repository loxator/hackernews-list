import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { getStory } from "../../requests/hackerNewsAPI";
import LoadingOverlay from "react-loading-overlay";
import Notification from "../Notification/Notifcation";

const useStyles = makeStyles({
  root: {
    background: "#fafafa",
    boxShadow:
      "0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    minHeight: "300px",
    marginTop: "25px",
    padding: "0 5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },

  avatar: {
    backgroundColor: "red",
  },
});

const Story = ({ id }) => {
  useEffect(() => {
    getStoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getStoryData = async () => {
    setLoading(true);
    const data = await getStory(id);
    if (data.error) {
      setError(true);
      return;
    }
    setStory(data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  //Show Snackbar in case of error
  if (error) {
    return (
      <Notification
        message={`Could not load story with ID ${id}`}
        severity="error"
        data-testid="story__error"
      />
    );
  }
  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Loading story"
      data-testid="story__loading__overlay"
    >
      <Card className={classes.root} data-testid="story__card">
        <CardContent>
          <CardHeader
            avatar={
              <Avatar
                aria-label="stories"
                className={classes.avatar}
                data-testid="story__card__avatar__letter"
              >
                {story && story.title && story.title[0]}
              </Avatar>
            }
            title={
              <Typography
                className={classes.title}
                gutterBottom
                data-testid="story__card__title"
              >
                {story && story.title}
              </Typography>
            }
            subheader={new Date(story.time * 1000).toDateString()}
          />
          <Typography gutterBottom>{story.title}</Typography>

          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            data-testid="story__card__author"
          >
            by - {story && story.by}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography>
            <a
              style={{ display: "table-cell" }}
              href={story && story.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="story__card__link"
            >
              Check it out!
            </a>
          </Typography>
        </CardActions>
      </Card>
    </LoadingOverlay>
  );
};

export default Story;
