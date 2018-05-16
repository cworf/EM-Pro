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
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  textField: {
    flex: 1,
    color: 'black',
  },
  button: {
    marginLeft: 'auto',
    opacity: 0,
    transition: '.2s ease',
    height: 'initial',
    width: 'initial',
  },
  dark: {
    marginLeft: 'auto',
    opacity: 0,
    transition: '.2s ease',
    height: 'initial',
    width: 'initial',
    background: '#615a2f',
  },
  darkInput: {
    color:'black'
  }
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

  handleSaveClick = (section, field) => async(event) => {
    event.preventDefault()
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
      if (field === 'inventory') {
        const diff = newValue - currentValue
        let {in_stock} = await eventDoc.data
        in_stock += diff
        await eventDoc.update({
          inventory: parseInt(newValue, 10),
          in_stock
        })
      } else{
        await eventDoc.update({
          [field] : type === 'number' ? parseInt(newValue, 10) : newValue
        })
      }
    }
    this.setState({...this.state, editingField: false})
  }

  handleInputChange = (event) => {
    this.setState({ ...this.state, newValue: event.target.value });
  };

  dateFormat = (date) => moment(date).format('MMMM Do, h:mm A');

  render(){
    const {classes, section, type, eventDoc, field, noLabel, small, span, color} = this.props;
    if (!eventDoc) return null
    if (!eventDoc.data) return null
    const thisValue = section ? eventDoc.data[section][field] : eventDoc.data[field]
    if ( this.state.editingField) {
      return (
        <form onSubmit={this.handleSaveClick(section, field)} style={{
          display: span ? 'inline-flex' : 'flex',
          position: 'relative',
          alignItems: 'center',
        }}>
          <TextField
            autoFocus
            id={field}
            label={noLabel ? null : field}
            type={type}
            defaultValue={thisValue}
            className={classes.textField}
            margin="normal"
            multiline={type === 'text' ? true : false}
            rowsMax="4"
            onChange={this.handleInputChange}
            InputLabelProps={{
              shrink: type === 'text' ? false : true,
              className: color==='dark'? classes.darkInput :null,
            }}
            InputProps={{
              className: color==='dark'? classes.darkInput :null,
            }}
          />
        <button type="submit" className='save-btn' color='default'>
          <SaveIcon color='secondary'/>
        </button>
      </form>
      )
    } else {
      return (!span
        ?<div>
          <Typography variant="body1" gutterBottom>
            {noLabel ? '' : field}
          </Typography>

          <div className='light-box' style={small ? {padding:'7px 10px'} : null}>
            {type === 'time' && thisValue ? ft.getFormattedTime(thisValue) : type === 'datetime-local' ? this.dateFormat(thisValue) : thisValue}

            <IconButton className={classes.button} size='small' aria-label="Delete" onClick={this.handleEditClick.bind(null, field, thisValue)}>
              <EditIcon color='primary' />
            </IconButton>
          </div>
        </div>
        :<span className='no-box'>
          {type === 'time' && thisValue ? ft.getFormattedTime(thisValue) : type === 'datetime-local' ? this.dateFormat(thisValue) : thisValue}
          <IconButton variant='raised' className={classes[color]} aria-label="Delete" onClick={this.handleEditClick.bind(null, field, thisValue)}>
            <EditIcon color='primary' />
          </IconButton>
        </span>
      )
    }
  }
})

RenderOrEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  eventDoc: PropTypes.any.isRequired,
  section: PropTypes.string,
  color: PropTypes.string,
  field: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  small: PropTypes.bool,
  noLabel: PropTypes.bool,
  span: PropTypes.bool,
}

export default withStyles(styles)(RenderOrEdit);
