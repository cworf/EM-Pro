import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class EventDetail extends React.Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, event } = this.props;

    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>

            <Typography variant="title" color="inherit" className={classes.flex}>
              {event.title}
            </Typography>
            <IconButton color="inherit" onClick={this.props.onClickClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Client" />
              <Tab label="Venue" />
              <Tab label="Details" />
              <Tab label="Equipment Needs" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>Item One</TabContainer>
            <TabContainer dir={theme.direction}>Item Two</TabContainer>
            <TabContainer dir={theme.direction}>Item Three</TabContainer>
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

EventDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickClose: PropTypes.func.isRequired,
  event: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EventDetail);
