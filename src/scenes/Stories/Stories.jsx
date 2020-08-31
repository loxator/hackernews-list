import React, { useEffect, useState } from "react";
import { getStoryIDs } from "../../requests/hackerNewsAPI";
import Story from "../../components/Story/Story";
import Grid from "@material-ui/core/Grid";
import { useLocation } from "react-router-dom";
const StoryContainer = () => {
  const [storyIDs, setStoryIDs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    let urlSuffix = "topstories";
    if (location.pathname === "/best") {
      urlSuffix = "/beststories";
    }
    if (location.pathname === "/new") {
      urlSuffix = "/newstories";
    }
    getStoryIDs(urlSuffix).then((data) => setStoryIDs(data.slice(0, 6)));
  }, [location]);
  return (
    <Grid container spacing={4}>
      {storyIDs.map((id) => (
        <Grid item xs={12} md={4} key={id}>
          <Story id={id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StoryContainer;
