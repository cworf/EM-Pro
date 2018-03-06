import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import {eventsCol} from '../appStore';
import {observer} from 'mobx-react';
import defaultEvent from '../../assets/data/defaultEvent';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const EventAddPrompt = observer(class EventAddPrompt extends React.Component {

  state = {
    eventName : null,
    eventTimeStart : moment(this.props.slotInfo.start).format('YYYY-MM-DDTHH:mm'),
    eventTimeEnd : moment(this.props.slotInfo.end).format('YYYY-MM-DDTHH:mm'),
    isAllDay : false,
  }

  handleChange = name => event => {
    this.setState({...this.state, [name]: event.target.value})
  }
  handleChecked = event => {
    this.setState({...this.state, isAllDay: event.target.checked})
  }

  handleEventAdd = async() => {
    const {eventName, eventTimeStart, eventTimeEnd, isAllDay} = this.state
    this.props.onClickClose();
    try {
      await eventsCol.add({
        ...defaultEvent,
        end: eventTimeEnd,
        start: eventTimeStart,
        title: eventName,
        allDay: isAllDay
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  render(){
    const {slotInfo} = this.props;
    const {eventName, eventTimeEnd, eventTimeStart, isAllDay} = this.state
    if (slotInfo) {
      console.log(moment(slotInfo.start).format('YYYY-MM-DDTHH:mm'));
      return (
        <div>
          <Dialog
            open={this.props.open}
            transition={Transition}
            keepMounted
            onClose={this.props.onClickClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">
              {"Create Event"}
            </DialogTitle>
            <DialogContent>
              <form noValidate>
                <FormGroup row>
                  <TextField
                    required
                    fullWidth
                    id="event-name"
                    label="Event Name"
                    margin="normal"
                    onChange={this.handleChange('eventName')}
                  />
                </FormGroup>
                <FormGroup row>
                  <TextField
                    id="start-datetime-local" label="Start Time"
                    type="datetime-local" defaultValue={eventTimeStart}
                    InputLabelProps={{shrink: true,}}
                    onChange={this.handleChange('eventTimeStart')}
                  />
                  <TextField
                    id="end-datetime-local" label="End Time"
                    type="datetime-local" defaultValue={eventTimeEnd}
                    InputLabelProps={{shrink: true,}}
                    onChange={this.handleChange('eventTimeEnd')}
                  />
                </FormGroup>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.isAllDay}
                        onChange={this.handleChecked}
                        color="primary"
                      />
                    }
                    label="All Day Event"
                  />
                </FormGroup>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClickClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleEventAdd} color="primary">
                Create Event
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return null
    }
  }
});

EventAddPrompt.propTypes = {
  slotInfo : PropTypes.object,
  open : PropTypes.bool,
  onClickClose : PropTypes.func,
}

export default EventAddPrompt;
