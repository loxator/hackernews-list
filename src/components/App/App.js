import React from "react";
import Grid from "@material-ui/core/Grid";
import TopNav from "../TopNav/TopNav";
import Stories from "../../scenes/Stories/Stories";
import theme from "../../static/theme";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const App = () => {
  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Router>
        <Grid container direction="column">
          <TopNav />
          <Grid item container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Switch>
                <Redirect exact from="/" to="/top" />
                <Route exact path={["/top", "/best", "/new"]}>
                  <Stories />
                </Route>
              </Switch>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
};

export default App;
