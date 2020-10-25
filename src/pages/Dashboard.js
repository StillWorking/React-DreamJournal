import React from "react";
import { withRouter } from "react-router-dom";
import { AuthUserContext, withAuthentication } from "../components/Session";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import Sidebar from "../components/Sidebar";
import useStyles from "../config/theme.dashboard";
import Copyright from "../components/copyright";
import Calendar from "../components/Calendar";

function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    props.firebase.auth.signOut();
    props.history.push("/");
  };

  return (
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="absolute"
              className={clsx(classes.appBar, open && classes.appBarShift)}
              style={{
                background:"linear-gradient(to right, tomato, cyan)"
              }}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Dream Journal
                </Typography>
              </Toolbar>
            </AppBar>
            <Sidebar
              signOut={signOut}
              open={!open}
              handleDrawerClose={handleDrawerClose}
            />
            <main
              className={
                (classes.content,
                !open ? classes.contentClosed : classes.appBarShift)
              }
            >
              <div className={classes.appBarSpacer} />
              <Container maxWidth="xl" className={classes.container}>
                <Calendar firebase={props.firebase} authUser={authUser} />
                <Box pt={4}>
                  <Copyright />
                </Box>
              </Container>
            </main>
          </div>
        ) : (
          <p>Not authorized!</p>
        )
      }
    </AuthUserContext.Consumer>
  );
}

export default withRouter(withAuthentication(Dashboard));
