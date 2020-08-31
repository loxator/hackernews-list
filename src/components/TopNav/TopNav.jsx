import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: "teal",
  },
  linkContainer: { flexGrow: 1, margin: "auto" },
  logoContainer: { flexGrow: 1, flexBasis: "75%" },
  listStyle: {
    display: "flex",
    listStyle: "none",
    justifyContent: "space-around",
    color: "#fff",
  },
}));

const TopNav = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Hacker News!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
