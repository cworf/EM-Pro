import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import { mailFolderListItems, otherMailFolderListItems } from '../assets/data/menuData';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Calendar from './pages/Calendar';
import Inventory from './pages/Inventory';
import Events from './pages/Events';
import Clients from './pages/Clients';
import Venues from './pages/Venues';
import Conflicts from './pages/Conflicts';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    background: '#0c100d',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      minHeight: '100vh',
      background: '#212b22'
    },
  },
  content: {
    backgroundColor: darkTheme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#0c100d',
    },
    primary: {
      light: '#439889',
      main: '#00695c',
      dark: '#003d33',
      contrastText: '#fff',
    },
    secondary: {
      light: '#9fffe0',
      main: '#69f0ae',
      dark: '#2bbd7e',
      contrastText: '#000',
    },
  },
});

class App extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <MuiThemeProvider theme={darkTheme}>
        <Reboot />
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap>
                  E.M. Pro
                </Typography>
              </Toolbar>
            </AppBar>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                classes={{
                  paper: classes.drawerPaper,
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <main className={classes.content}>
              <Switch>
                <Route exact path='/' component={Calendar} />
                <Route path='/inventory' component={Inventory} />
                <Route path='/events' component={Events} />
                <Route path='/clients' component={Clients} />
                <Route path='/venues' component={Venues} />
                <Route path='/conflicts' component={Conflicts} />
              </Switch>
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
