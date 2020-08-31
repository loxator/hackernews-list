import React, { useEffect, useState } from "react";
import { getStoryIDs } from "../../requests/hackerNewsAPI";
import Story from "../../components/Story/Story";
import Grid from "@material-ui/core/Grid";
const StoryContainer = () => {
  const [storyIDs, setStoryIDs] = useState([]);
  useEffect(() => {
    getStoryIDs().then((data) => setStoryIDs(data.slice(0, 6)));
  }, []);
  return (
    <Grid container spacing={4}>
      {storyIDs.map((id) => (
        <Grid item xs={12} md={4}>
          <Story id={id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StoryContainer;
