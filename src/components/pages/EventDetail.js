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
import DeleteIcon from 'material-ui-icons/Delete';
import { Collection, Document } from 'firestorter';

import EventDetailBox from '../ui/EventDetailBox';
import EventVenue from '../ui/EventVenue';
import EventClient from '../ui/EventClient';
import DocSelector from '../ui/DocSelector';
import RenderOrEdit from '../ui/RenderOrEdit'
import AreYouSure from '../ui/AreYouSure'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 24 }}>
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
});

class EventDetail extends React.Component {

  state = {
    value: 0,
  };

  handleDocSelect = async(name, path) => {
    await this.props.eventDoc.update({
      [name]: path,
    });
    await this.setState({...this.state})
  }

  handleChange = (event, value) => {
    this.setState({...this.state, value });
  };

  handleChangeIndex = index => {
    console.log('clicked');
    this.setState({...this.state, value: index });
  };

  handleDelete = () => {
    this.props.eventDoc.delete()
    this.props.onClickClose()
  }

  dateFormat = (date) => moment(date).format('MMMM Do, h:mm A');

  render() {
    const { classes, eventDoc, theme } = this.props;
    return (
      <div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <RenderOrEdit span color="dark" eventDoc={eventDoc} field='title' type='text'/>

              <span style={{fontWeight: 200, paddingLeft: 20}}>
                <RenderOrEdit span color="dark" eventDoc={eventDoc} field='start' type='datetime-local'/></span>   -    <span style={{fontWeight: 200, paddingLeft: 20}}><RenderOrEdit span color="dark" eventDoc={eventDoc} field='end' type='datetime-local'/> </span>
            </Typography>
            <AreYouSure
              question='Deleting an event is irreversable, all associated orders will be removed from the system permanently, are you sure you want to do this?'
              doubleCheck
              acceptBtn='Delete Forever'
              cancelBtn='No! take me back.'
              onAccept={this.handleDelete}
            >
              <DeleteIcon />
            </AreYouSure>
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
          <Grid item xs={12} sm={4} style={{padding: '36px 12px'}}>
            <Typography variant="display1" align="center" gutterBottom>
              Details
            </Typography>
            <Paper className={classes.paper}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <RenderOrEdit eventDoc={eventDoc} field='Load In' type='datetime-local'/>
                </Grid>
                <Grid item xs={12}>
                  <RenderOrEdit eventDoc={eventDoc} field='Load In Desc' type='text'/>
                </Grid>
                {['Doors Open','Doors Close','Sound Check', 'Tech'].map((fieldName, i) =>
                <Grid key={i} item xs={12} sm={6}>
                  <RenderOrEdit eventDoc={eventDoc} field={fieldName} type='time'/>
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
