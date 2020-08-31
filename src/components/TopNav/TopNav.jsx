import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: "linear-gradient(90deg, #041F5D 36.98%, #006BA8 100%)",
  },
  linkContainer: { flexGrow: 1, margin: "auto" },
  logoContainer: { flexGrow: 1, flexBasis: "75%" },
  title: {
    flexGrow: 1,
  },
  nav: {
    flexGrow: 1,
  },
  links: {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-around",
    "& > li a": {
      color: "white",
      textDecoration: "none",
      "&.active": {
        textDecoration: "underline",
      },
    },
  },
}));

const TopNav = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.wrapper} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Hacker News!
        </Typography>

        <nav className={classes.nav}>
          <ul className={classes.links}>
            <li>
              <NavLink to="/top">
                <Typography variant="h6" className={classes.title}>
                  Top
                </Typography>
              </NavLink>
            </li>
            <li>
              <NavLink to="/best">
                <Typography variant="h6" className={classes.title}>
                  Best
                </Typography>
              </NavLink>
            </li>
            <li>
              <NavLink to="/new">
                <Typography variant="h6" className={classes.title}>
                  New
                </Typography>
              </NavLink>
            </li>
          </ul>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
