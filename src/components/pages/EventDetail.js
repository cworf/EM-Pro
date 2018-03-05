import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Grid from 'material-ui/Grid';
import moment from 'moment';
import './EventDetail.css';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';

import DetailBox from '../ui/DetailBox';
import SelectedVenue from '../ui/SelectedVenue';
import SelectedClient from '../ui/SelectedClient';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    marginBottom: 15
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  typeContainer: {
    width: '90%',
    margin: 'auto'
  }
});

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

  dateFormat = (date) =>
    moment(date).format('MMMM Do YYYY, h:mm:ss a');

  render() {
    const { classes, event, theme } = this.props;
    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {event.title} | {this.dateFormat(event.start)} - {this.dateFormat(event.end)}
            </Typography>
            <IconButton color="inherit" onClick={this.props.onClickClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Production Info" />
            <Tab label="Audio" />
            <Tab label="Lighting" />
            <Tab label="Video" />
            <Tab label="Backline" />
            <Tab label="Crew" />
            <Tab label="Other" />
          </Tabs>
        </AppBar>

        <Grid container spacing={24} className={classes.typeContainer}>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Typography variant="subheading" align="center" gutterBottom>
                Details
              </Typography>
              <Grid container spacing={16}>
                {Object.keys(event.schedule).map((fieldName, i) =>
                <Grid key={i} item xs={12} sm={6}>
                  <Typography variant="body1" gutterBottom>
                    {fieldName}
                  </Typography>
                  <div className='light-box'>
                    {event.schedule[fieldName]}
                  </div>
                </Grid>)}
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subheading" align="center" gutterBottom>
                Venue Info
              </Typography>
              {event.venue.venue
                ? <SelectedVenue venue={event.venue} />
                : 'no venue selected, insert venue select box here'}
            </Paper>

            <Paper className={classes.paper}>
              <Typography variant="subheading" align="center" gutterBottom>
                Client Info
              </Typography>
              {event.client
                ? <SelectedClient client={event.client} />
              : 'no client selected, insert client select box here'}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={8}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
            {Object.keys(event)
              .filter(title => /^(production|audio|lighting|video|backline|crew|other)/g.test(title))
              .map((key, i) =>
              <TabContainer key={i} dir={theme.direction}>
                <DetailBox section={event[key]} />
              </TabContainer>
            )}
            </SwipeableViews>
          </Grid>
        </Grid>
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
