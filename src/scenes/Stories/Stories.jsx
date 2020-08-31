import React, { useEffect, useState } from "react";
import { getStoryIDs } from "../../requests/hackerNewsAPI";
import Story from "../../components/Story/Story";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const StoryContainer = () => {
  const [storyIDs, setStoryIDs] = useState([]);
  const [noOfStories, setnoOfStories] = useState(0);
  const [count, setCount] = useState(30);
  const location = useLocation();

  useEffect(() => {
    let urlSuffix = "topstories";
    if (location.pathname === "/best") {
      urlSuffix = "/beststories";
    }
    if (location.pathname === "/new") {
      urlSuffix = "/newstories";
    }
    getStoryIDs(urlSuffix).then((data) => {
      setStoryIDs(data.slice(0, count));
      setnoOfStories(data.length);
    });
  }, [location, count]);
  return (
    <InfiniteScroll
      dataLength={storyIDs.length}
      next={() => setCount(count + 30)}
      hasMore={count < noOfStories}
      loader={
        <Typography
          style={{
            textAlign: "center",
            margin: "10px 0",
          }}
        >
          Loading more stories
        </Typography>
      }
      endMessage={
        <Typography
          style={{
            textAlign: "center",
            margin: "10px 0",
            textDecoration: "underline",
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          <b>Yay! You have seen it all. Click here to scroll back to the top</b>
        </Typography>
      }
    >
      <Grid container spacing={4}>
        {storyIDs.map((id) => (
          <Grid item xs={12} md={4} key={id}>
            <Story id={id} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default StoryContainer;
