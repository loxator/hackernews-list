import React, { useEffect, useState } from "react";
import { getStoryIDs } from "../../requests/hackerNewsAPI";
import Story from "../../components/Story/Story";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Notification from "../../components/Notification/Notifcation";
import LoadingOverlay from "react-loading-overlay";
const StoryContainer = () => {
  const [storyIDs, setStoryIDs] = useState([]);
  const [noOfStories, setnoOfStories] = useState(0);
  const [count, setCount] = useState(30);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let urlSuffix = "topstories";
    if (location.pathname === "/best") {
      urlSuffix = "/beststories";
    }
    if (location.pathname === "/new") {
      urlSuffix = "/newstories";
    }
    setLoading(true);
    getStoryIDs(urlSuffix).then((data) => {
      if (data.error) {
        setError(true);
        return;
      }
      setStoryIDs(data.slice(0, count));
      setnoOfStories(data.length);
      setLoading(false);
    });
  }, [location, count]);

  //Show Snackbar in case of error
  if (error) {
    return (
      <Notification
        message="Server Error"
        severity="error"
        data-testid="story__error"
      />
    );
  }

  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Fetching stories for you!"
      data-testid="story__loading__overlay"
      styles={{
        wrapper: {
          position: "inherit",
          fontFamily: "Poppins",
        },
      }}
    >
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
            data-testid="story__loader__text"
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
            data-testid="story__end__text"
          >
            <b>
              Yay! You have seen it all. Click here to scroll back to the top
            </b>
          </Typography>
        }
      >
        <Grid container spacing={4} data-testid="story__grid">
          {storyIDs.map((id, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={id + index}
              data-testid={`story__item`}
            >
              <Story id={id} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </LoadingOverlay>
  );
};

export default StoryContainer;
