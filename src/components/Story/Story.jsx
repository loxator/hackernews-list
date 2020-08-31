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

const useStyles = makeStyles((theme) => ({
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
}));

const Story = ({ id }) => {
  useEffect(() => {
    setLoading(true);
    getStory(id).then((story) => setStory(story));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const classes = useStyles();
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <LoadingOverlay active={loading} spinner text="Loading story">
      <Card className={classes.root}>
        <CardContent>
          <CardHeader
            avatar={
              <Avatar aria-label="stories" className={classes.avatar}>
                {story && story.title && story.title[0]}
              </Avatar>
            }
            title={story.title}
            subheader={new Date(story.time * 1000).toDateString()}
          />
          <Typography className={classes.title} gutterBottom>
            {story.title}
          </Typography>

          <Typography variant="body2" component="p" color="textSecondary">
            by - {story.by}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography>
            <a
              style={{ display: "table-cell" }}
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
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
