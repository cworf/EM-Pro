import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { topMenuItems, bottomMenuItems } from '../assets/data/menuData';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import DummyEvents from '../assets/data/events';
import DummyClients from '../assets/data/clients';
import DummyVenues from '../assets/data/venues';
import DummyCarasStages from '../assets/data/carasStages';
import DummyWilmaStages from '../assets/data/wilmaStages';

import {eventsCol, clients, venues, wilmaStages, carasStages} from './appStore';

import Calendar from './pages/Calendar';
import Inventory from './pages/Inventory';
import Clients from './pages/Clients';
import Venues from './pages/Venues';
import Conflicts from './ui/Conflicts';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    backgroundColor: '#1b1d23',
    color: '#fff',
    position: 'fixed',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    width: drawerWidth,
    display: 'block',
    overflowY: 'initial'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,

    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: 0,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: drawerWidth,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});


class App extends React.Component {
  state = {
    open: true,
    anchor: 'left',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  handleClientsAdd = async() => {
    try {
      await Object.keys(DummyClients).map(id =>
        clients.add(DummyClients[id]));
    }
    catch (err) {
      console.log(err);
    }
  }
  handleEventsAdd = async() => {
    try {
      await eventsCol.add({...DummyEvents.q});
    }
    catch (err) {
      console.log(err);
    }
  }
  handleVenuesAdd = async() => {
    try {
      await Object.keys(DummyVenues).map(id =>
        venues.add(DummyVenues[id]));
    }
    catch (err) {
      console.log(err);
    }
  }
  handleWilmaAdd = async() => {
    try {
      await Object.keys(DummyWilmaStages).map(id =>
        wilmaStages.add(DummyWilmaStages[id]));
    }
    catch (err) {
      console.log(err);
    }
  }
  handleCarasAdd = async() => {
    try {
      await Object.keys(DummyCarasStages).map(id =>
        carasStages.add(DummyCarasStages[id]));
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    return (
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                E.M. Pro
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            anchor={anchor}
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>{topMenuItems}</List>
            <Divider />
            <List>
              {bottomMenuItems}
              <Conflicts />
            </List>
            <Divider />
            {/*
            <div onClick={this.handleVenuesAdd}>Add Venue Data</div>
            <div onClick={this.handleClientsAdd}>Add Clients Data</div>
            <div onClick={this.handleEventsAdd}>Add Event Data</div>
            <div onClick={this.handleCarasAdd}>Add Caras Stage Data</div>
          <div onClick={this.handleWilmaAdd}>Add Wilma Stage Data</div>*/}
          </Drawer>
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Switch>
              <Route exact path='/' component={Calendar} />
              <Route path='/inventory' component={Inventory} />
              <Route path='/clients' component={Clients} />
              <Route path='/venues' component={Venues} />
              <Route path='/conflicts' component={Conflicts} />
            </Switch>
          </main>
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
