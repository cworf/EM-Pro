import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import ft from 'format-time';
import TextField from 'material-ui/TextField';
import EditIcon from 'material-ui-icons/ModeEdit';
import SaveIcon from 'material-ui-icons/Done';
import Typography from 'material-ui/Typography';
import {observer} from 'mobx-react';
import moment from 'moment';

const styles = theme => ({
  textField: {
    flex: 1,
  },
});

const RenderOrEdit = observer(class RenderOrEdit extends Component {

  state = {
    editingField: false,
    currentValue: null,
    newValue: null,
  };

  handleEditClick = (field, value) => {
    this.setState({...this.state, editingField: true, newValue: value, currentValue:value })
  }

  handleSaveClick = async(section, field) => {
    const {newValue, currentValue} = this.state
    const {eventDoc, type} = this.props
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
        [field] : type === 'number' ? parseInt(newValue, 10) : newValue
      })
    }
    this.setState({...this.state, editingField: false})
  }

  handleInputChange = (event) => {
    this.setState({ ...this.state, newValue: event.target.value });
  };

  dateFormat = (date) => moment(date).format('MMMM Do, h:mm A');

  render(){
    const {classes, section, type, eventDoc, field, noLabel, small} = this.props;
    const thisValue = section ? eventDoc.data[section][field] : eventDoc.data[field]
    if ( this.state.editingField) {
      return (
        <form style={{display:'flex', position: 'relative', alignItems: 'center'}}>
          <TextField
            id={field}
            label={!noLabel ? field : null}
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
        {noLabel ? '' : field}
      </Typography>
      <div className='light-box' style={small ? {padding:'7px 10px'} : null}>
        {type === 'time' && thisValue ? ft.getFormattedTime(thisValue) : type === 'datetime-local' ? this.dateFormat(thisValue) : thisValue}
        <button
          className='edit-btn'
          onClick={this.handleEditClick.bind(null, field, thisValue)}>
            <EditIcon color='primary' />
        </button>
      </div>
      </div>)
    }
  }
})

RenderOrEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  eventDoc: PropTypes.any.isRequired,
  section: PropTypes.string,
  field: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  small: PropTypes.bool,
  noLabel: PropTypes.bool,
}

export default withStyles(styles)(RenderOrEdit);
