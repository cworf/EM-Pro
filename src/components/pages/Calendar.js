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
import {events} from '../appStore';
import {observer} from 'mobx-react';

import EventDetail from './EventDetail'

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



const Calendar = observer(class Calendar extends React.Component{

  state = {
    open: false,
    clickedEvent: null,
  };

  handleClickOpen = (event) =>
    this.setState({ open: true, clickedEvent: event });


  handleClose = () =>
    this.setState({ ...this.state, open: false });


  eventsParse = (events) =>
    events.docs.map(event =>
      event.data
    )


  render(){
    return (
      <div style={{height: 'calc(100vh - 112px)'}}>
        <BigCalendar
          selectable
          events={this.eventsParse(events)}
          defaultView="month"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2016, 4, 12)}
          onSelectEvent={event => this.handleClickOpen(event)}
          onSelectSlot={slotInfo =>
            alert(
              `selected slot:
                start ${slotInfo.start.toLocaleString()}
                end: ${slotInfo.end.toLocaleString()}
                action: ${slotInfo.action}`
            )

          }
        />
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <EventDetail onClickClose={this.handleClose} event={this.state.clickedEvent} />
        </Dialog>
      </div>
    );
  }
})

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
