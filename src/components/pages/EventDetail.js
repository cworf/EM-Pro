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
import ft from 'format-time';
import './EventDetail.css';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import {observer} from 'mobx-react';
import TextField from 'material-ui/TextField';
import EditIcon from 'material-ui-icons/ModeEdit';
import SaveIcon from 'material-ui-icons/Done';

import EventDetailBox from '../ui/EventDetailBox';
import EventVenue from '../ui/EventVenue';
import EventClient from '../ui/EventClient';
import DocSelector from '../ui/DocSelector';

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
    venuePath: null,
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
    this.setState({...this.state, editingField: field, newValue: value, currentValue:value })
  }

  handleSaveClick = async(section, field) => {
    const {newValue, currentValue} = this.state
    const {eventDoc} = this.props
    if (section) {
      if (newValue !== currentValue) {
        await eventDoc.set({
          [section] : {
            [field] : newValue
          }
        }, {merge: true});
      }
    } else if (newValue !== currentValue) {
      await eventDoc.update({
        [field] : newValue
      })
    }
    this.setState({...this.state, editingField: null})
  }

  handleDocSelect = async(name, path) => {
    await this.props.eventDoc.update({
      [name]: path,
    });
    await this.setState({...this.state})
  }

  dateFormat = (date) => moment(date).format('MMMM Do, h:mm A');

  renderOrEdit = (eventDoc, section, field, type) => {
    const {classes} = this.props;
    const thisValue = section ? eventDoc[section][field] : eventDoc[field]
    if ( this.state.editingField === field ) {
      return (
        <form style={{display:'flex', position: 'relative', alignItems: 'center'}}>
          <TextField
            id={field}
            label={field}
            defaultValue={thisValue}
            className={classes.textField}
            type={type}
            margin="normal"
            multiline={type === 'text' ? true : false}
            rowsMax="4"
            onChange={this.handleInputChange}
            InputLabelProps={{
            shrink: type === 'text' ? false : true,
          }}
          />
        <button className='save-btn' type="button" onClick={this.handleSaveClick.bind(null, section, field)}>
          <SaveIcon color='secondary'/>
        </button>
      </form>
      )
    } else {
      return (<div><Typography variant="body1" gutterBottom>
        {field}
      </Typography>
      <div className='light-box'>
        {type === 'time' && thisValue ? ft.getFormattedTime(thisValue) : type === 'datetime-local' ? this.dateFormat(thisValue) : thisValue}
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
              {eventDoc.data.title} <span style={{fontWeight: 200, paddingLeft: 20}}> {this.dateFormat(eventDoc.data.start)}   -   {this.dateFormat(eventDoc.data.end)} </span>
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
            <Tab label="Cables" />
            <Tab label="Backline" />
            <Tab label="Crew" />
            <Tab label="Other" />
          </Tabs>
        </AppBar>

        <Grid container spacing={24} className={classes.typeContainer}>
          <Grid item xs={12} sm={4}>
            <Typography variant="display1" align="center" gutterBottom>
              Details
            </Typography>
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  {this.renderOrEdit(eventDoc.data, '', 'Load In', 'datetime-local')}
                </Grid>
                <Grid item xs={12}>
                  {this.renderOrEdit(eventDoc.data, '', 'Load In Desc', 'text')}
                </Grid>
                {['Doors Open','Doors Close','Sound Check', 'Tech'].map((fieldName, i) =>
                <Grid key={i} item xs={12} sm={6}>
                  {this.renderOrEdit(eventDoc.data, '', fieldName, 'time')}
                </Grid>)}
              </Grid>
            </Paper>

            <Typography variant="subheading" align="center" gutterBottom>
              Venue
            </Typography>
            <Paper className={classes.paper}>
              {eventDoc.data.venue
              ? <EventVenue
                hasStage={eventDoc.data.stage ? true : false}
                venue={eventDoc.data.venue}
                onDocSelect={this.handleDocSelect}/>
              : <DocSelector venue onDocSelect={this.handleDocSelect}/>}
            </Paper>

            <Typography variant="subheading" align="center" gutterBottom>
              Client Info
            </Typography>
            <Paper className={classes.paper}>
              {eventDoc.data.client
                ? <EventClient client={eventDoc.data.client} />
              : <DocSelector client onDocSelect={this.handleDocSelect}/>}
            </Paper>
          </Grid>

          <Grid item xs={12} sm={8}>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
            {['production','audio','lighting','video','cables','backline','crew','other']
              .map((key, i) =>{
              return <TabContainer key={i} dir={theme.direction}>
                <EventDetailBox onRenderOrEdit={this.renderOrEdit} eventDoc={eventDoc} sectionName={key} section={eventDoc.data[key]} />
              </TabContainer>
            })}
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
