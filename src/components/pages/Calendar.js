import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// import events from '../../assets/data/events.js';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import {firebase} from '../../firebase';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';

import EventDetail from './EventDetail';
import EventAddPrompt from '../ui/EventAddPrompt';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))



class Calendar extends React.Component{

  state = {
    open: false,
    clickedEvent: null,
    slotInfo: null,
    promptOpen: false,
  };

  handleClickOpen = (clickedEvent) => {
    const eventDoc = firebase.eventsCol.docs.map(item =>
      item.id === clickedEvent.id
        ? item : null
    ).filter(item => item)

    this.setState({ ...this.state, open: true, clickedEvent: eventDoc[0] });

  }

  handleClose = () =>
    this.setState({ ...this.state, open: false });

  handlePromptOpen = (slotInfo) => {
    this.setState({ ...this.state, promptOpen: true, slotInfo });
  };

  handlePromptClose = () => {
    this.setState({ ...this.state, promptOpen: false, slotInfo:null });
  };


  eventsParse = (events) =>
    events.docs.map(eventDoc =>{
      return {...eventDoc.data, id:eventDoc.id}
    })


  render(){
    return (
      <div style={{height: 'calc(100vh - 112px)'}}>
        <BigCalendar
          selectable
          events={this.eventsParse(firebase.eventsCol)}
          defaultView="month"
          scrollToTime={new Date(1970, 1, 1, 6)}
          onSelectEvent={event => this.handleClickOpen(event)}
          onSelectSlot={slotInfo => this.handlePromptOpen(slotInfo)

          }
        />
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <EventDetail onClickClose={this.handleClose} eventDoc={this.state.clickedEvent} />
        </Dialog>
        {this.state.promptOpen
          ? <EventAddPrompt
            slotInfo={this.state.slotInfo}
            open={this.state.promptOpen}
            onClickClose={this.handlePromptClose}
            onEventAdd={this.handleClickOpen}
           />
          : null
        }

      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const authCondition = (authUser) => !!authUser;

export default compose(
   withAuthorization(authCondition),
   inject('userStore'),
   observer,
   withStyles(styles)
)(Calendar);
