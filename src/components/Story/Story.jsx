import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { getStory } from "../../requests/hackerNewsAPI";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red",
  },
}));

const Story = ({ id }) => {
  useEffect(() => {
    getStory(id).then((story) => setStory(story));
  });
  const classes = useStyles();
  const [story, setStory] = useState({});

  return (
    <Card>
      <CardContent>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
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
            Go To Story
          </a>
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Story;
