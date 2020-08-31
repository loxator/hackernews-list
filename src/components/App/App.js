import React from "react";
import Grid from "@material-ui/core/Grid";
import TopNav from "../TopNav/TopNav";
import Stories from "../../scenes/Stories/Stories";

const App = () => {
  return (
    <Grid container direction="column">
      <TopNav />
      <Grid item container>
        <Grid item xs={0} sm={2} />
        <Grid item xs={12} sm={8}>
          <Stories />
        </Grid>
        <Grid item xs={0} sm={2} />
      </Grid>
    </Grid>
  );
};

export default App;
