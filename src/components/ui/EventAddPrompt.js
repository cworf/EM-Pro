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
import Typography from 'material-ui/Typography';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const EventAddPrompt = observer(class EventAddPrompt extends React.Component {

  state = {
    eventName : null,
    eventTimeStart : moment(this.props.slotInfo.start).add(30, 'm').format('YYYY-MM-DDTHH:mm'),
    eventTimeEnd : moment(this.props.slotInfo.end).add(30, 'm').format('YYYY-MM-DDTHH:mm'),
    isAllDay : false,
  }

  handleChange = name => event => {
    this.setState({...this.state, [name]: event.target.value})
  }
  handleChecked = event => {
    this.setState({...this.state, isAllDay: event.target.checked})
  }

  handleEventAdd = async(e) => {
    e.preventDefault()
    const {eventName, eventTimeStart, eventTimeEnd, isAllDay} = this.state
    this.props.onClickClose('new');
    try {
      await eventsCol.add({
        ...defaultEvent,
        end: eventTimeEnd,
        start: eventTimeStart,
        title: eventName,
        allDay: isAllDay
      }).then( eventDoc =>
        this.props.onEventAdd(eventDoc)
      )
    }
    catch (err) {
      console.log(err);
    }
  }

  render(){
    const {slotInfo} = this.props;
    const {eventTimeEnd, eventTimeStart} = this.state
    if (slotInfo) {
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
            <form noValidate onSubmit={this.handleEventAdd}>
            <DialogContent>
                <FormGroup style={{marginBottom:'20px'}} row>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    id="event-name"
                    label="Event Name"
                    margin="normal"
                    onChange={this.handleChange('eventName')}
                  />
                </FormGroup>
                <Typography variant="body2" gutterBottom >
                  How long will you need the equipment?
                </Typography>
                <FormGroup style={{marginBottom:'20px'}} row>
                  <TextField
                    id="start-datetime-local" label="From"
                    type="datetime-local" defaultValue={eventTimeStart}
                    InputLabelProps={{shrink: true,}}
                    onChange={this.handleChange('eventTimeStart')}
                  />
                  <TextField
                    id="end-datetime-local" label="To"
                    type="datetime-local" defaultValue={eventTimeEnd}
                    InputLabelProps={{shrink: true,}}
                    onChange={this.handleChange('eventTimeEnd')}
                  />
                </FormGroup>
                <FormGroup style={{marginBottom:'20px'}} row>
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
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.onClickClose} color="primary">
                Cancel
              </Button>
              <Button type='submit' color="primary">
                Create Event
              </Button>
            </DialogActions>
          </form>
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
  onEventAdd : PropTypes.func
}

export default EventAddPrompt;
