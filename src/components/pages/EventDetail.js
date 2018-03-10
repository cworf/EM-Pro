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
import {observer} from 'mobx-react';
import TextField from 'material-ui/TextField';
import EditIcon from 'material-ui-icons/ModeEdit';
import SaveIcon from 'material-ui-icons/Done';

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
    marginBottom: 15,
    background: '#2b3038',
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
  },
  textField: {
    flex: 1,
  },
});

class EventDetail extends React.Component {

  state = {
    value: 0,
    editingField: null,
    currentValue: null,
    newValue: null,
  };

  handleChange = (event, value) => {
    this.setState({...this.state, value });
  };
  handleInputChange = (event) => {
    this.setState({ ...this.state, newValue: event.target.value });
  };

  handleChangeIndex = index => {
    this.setState({...this.state, value: index });
  };

  handleEditClick = (field, value) => {
    this.setState({...this.state, editingField: field, newValue: value })
  }

  handleSaveClick = async(section, field) => {
    await this.props.eventDoc.set({
      [section] : {
        [field] : this.state.newValue
      }
    }, {merge: true});
    this.setState({...this.state, editingField: null})
  }

  dateFormat = (date) =>
    moment(date).format('MMMM Do YYYY, h:mm:ss a');

  renderOrEdit = (eventDoc, section, field) => {
    const {classes} = this.props;
    if ( this.state.editingField === field ) {
      return (
        <form style={{display:'flex', position: 'relative', alignItems: 'center'}}>
          <TextField
            id={field}
            label={field}
            defaultValue={eventDoc[section][field]}
            className={classes.textField}
            margin="normal"
            multiline
            rowsMax="4"
            onChange={this.handleInputChange}
          />
        <button className='save-btn' type="button" onClick={this.handleSaveClick.bind(null, section, field)}>
          <SaveIcon color='secondary'/>
        </button>
      </form>
      )
    } else {
      let thisValue = eventDoc[section][field]
      return (<div><Typography variant="body1" gutterBottom>
        {field}
      </Typography>
      <div className='light-box'>
        {eventDoc[section][field]}
        <button className='edit-btn' onClick={this.handleEditClick.bind(null, field, thisValue)}>
          <EditIcon color='primary' />
        </button>
      </div>
      </div>)
    }
  }

  render() {
    const { classes, eventDoc, theme } = this.props;
    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {eventDoc.data.title} | {this.dateFormat(eventDoc.data.start)} - {this.dateFormat(eventDoc.data.end)}
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
            <Typography variant="subheading" align="center" gutterBottom>
              Details
            </Typography>
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                {Object.keys(eventDoc.data.schedule).map((fieldName, i) =>
                <Grid key={i} item xs={12} sm={6}>
                  {this.renderOrEdit(eventDoc.data, 'schedule', fieldName)}
                </Grid>)}
              </Grid>
            </Paper>

            <Typography variant="subheading" align="center" gutterBottom>
              Venue Info
            </Typography>
            <Paper className={classes.paper}>
              {eventDoc.data.venue.venue
                ? <SelectedVenue venue={eventDoc.data.venue} />
                : 'no venue selected, insert venue select box here'}
            </Paper>

            <Typography variant="subheading" align="center" gutterBottom>
              Client Info
            </Typography>
            <Paper className={classes.paper}>
              {eventDoc.data.client
                ? <SelectedClient client={eventDoc.data.client} />
              : 'no client selected, insert client select box here'}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={8}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
            {['production','audio','lighting','video','backline','crew','other']
              .map((key, i) =>
              <TabContainer key={i} dir={theme.direction}>
                <Typography variant="display1" style={{textTransform:'capitalize', float: 'left'}} gutterBottom>
                  {key}
                </Typography>
                <DetailBox onRenderOrEdit={this.renderOrEdit} eventDoc={eventDoc} sectionName={key} section={eventDoc.data[key]} />
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
  eventDoc: PropTypes.any,
  theme: PropTypes.object.isRequired,
};

export default observer(withStyles(styles, { withTheme: true })(EventDetail));
