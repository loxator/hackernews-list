import React from "react";
import Grid from "@material-ui/core/Grid";
import TopNav from "../TopNav/TopNav";
import Stories from "../../scenes/Stories/Stories";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Grid container direction="column">
        <TopNav />
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Switch>
              <Redirect exact from="/" to="/top" />
              <Route exact path={["/top", "/best", "/new"]}>
                <Stories />
              </Route>
            </Switch>
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
