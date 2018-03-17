import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import GetEventDoc from './GetEventDoc'

class AffectedEvents extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {eventRefs} = this.props
    console.log(eventRefs);
    return (
      <div>
        <Button onClick={this.handleClickOpen}>{eventRefs.length} Events</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            { eventRefs.map((ref, i) => <GetEventDoc key={i} eventRef={ref} />) }
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

AffectedEvents.propTypes = {
  eventRefs: PropTypes.any.isRequired
}

export default AffectedEvents;
