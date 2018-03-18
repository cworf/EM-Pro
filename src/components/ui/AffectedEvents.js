import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';

import GetEventDoc from './GetEventDoc'
import EventDetail from '../pages/EventDetail';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AffectedEvents extends React.Component {
  state = {
    listOpen: false,
    eventOpen: false,
    clickedEvent: null,
  };

  handleClickOpen = () => 
    this.setState({ ...this.state, listOpen: true });

  handleClose = () =>
    this.setState({ ...this.state, listOpen: false });

  handleEventClose = () =>
    this.setState({ ...this.state, eventOpen: false });

  handleEventClick = (eventDoc) =>
    this.setState({...this.state, eventOpen: true, clickedEvent: eventDoc})

  render() {
    const {eventRefs} = this.props
    return (
      <div>
        <Button onClick={this.handleClickOpen}>{eventRefs.length} Events</Button>
        <Dialog
          open={this.state.listOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Select event to edit"}</DialogTitle>
          <DialogContent>
            <List>
              { eventRefs.map((ref, i) =>{
                return <GetEventDoc key={i} eventRef={ref} onListItemClick={this.handleEventClick} />}) }
            </List>
          </DialogContent>
        </Dialog>
        <Dialog
          fullScreen
          open={this.state.eventOpen}
          onClose={this.handleEventClose}
          transition={Transition}
        >
          <EventDetail onClickClose={this.handleEventClose} eventDoc={this.state.clickedEvent} />
        </Dialog>
      </div>
    );
  }
}

AffectedEvents.propTypes = {
  eventRefs: PropTypes.any.isRequired
}

export default AffectedEvents;
