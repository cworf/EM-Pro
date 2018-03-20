import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import {observer} from 'mobx-react';
import { Collection } from 'firestorter';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  textField: {
    width: 240,
    marginBottom: 15,
  },
});

const CreatePullOrderPrompt = observer(class CreatePullOrderPrompt extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    anchorOriginVertical: 'center',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'center',
    transformOriginHorizontal: 'center',
    positionTop: 200, // Just so the popover can be spotted more easily
    positionLeft: 400, // Same as above
    anchorReference: 'anchorEl',
    pullQty: 0,
    dateTimeStart: this.props.eventDoc.data.start,
    dateTimeEnd: this.props.eventDoc.data.end,
  };

  handleClickButton = () => {
    this.setState({
      ...this.state,
      open: true,
      anchorEl: findDOMNode(this.button),
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      open: false,
    });
  };

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  button = null;

  render() {
    const { classes } = this.props;
    const {
      open,
      anchorEl,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      positionTop,
      positionLeft,
      anchorReference,
      dateTimeStart,
      dateTimeEnd,
    } = this.state;

    return (
      <div>
        <Button
          ref={node => {
            this.button = node;
          }}
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={this.handleClickButton}
        >
          Select Qty
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: positionTop, left: positionLeft }}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
          <form className={classes.container} onSubmit={this.handleCreateOrder}>
            <TextField
              id="number"
              label="Enter Quantity"
              value={this.state.pullQty}
              onChange={this.handleChange('pullQty')}
              type="number"
              className={classes.textField}
              margin="normal"
              />
            <TextField
              id="datetime-local-order-start"
              label="Need Item(s) From:"
              type="datetime-local"
              onChange={this.handleChange('dateTimeStart')}
              defaultValue={dateTimeStart}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="datetime-local-order-start"
              label="Need Item(s) Until:"
              type="datetime-local"
              onChange={this.handleChange('dateTimeEnd')}
              defaultValue={dateTimeEnd}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type='submit' variant='raised' color='secondary' component='button' size="small" className={classes.button}>
              Create Pull Order
            </Button>
            <Button onClick={this.handleClose} variant='raised' color='primary' size="small" className={classes.button}>
              Cancel
            </Button>
          </form>
        </Popover>
      </div>
    );
  }

  handleCreateOrder = async(event) => {
    event.preventDefault();
    const {dateTimeEnd, dateTimeStart, pullQty} = this.state;
    const {eventDoc, item } = this.props;
    const qtyInt = parseInt(pullQty, 10);
    // const newOrderDoc = new Document('orders')
    const itemOrdersCol = new Collection(() => `${item.path}/orders`); //item sub collection
    const eventOrdersCol = new Collection(() => `${eventDoc.path}/orders`); //item sub collection
    if (pullQty > 0 && qtyInt <= item.data.inStock) {
      this.handleClose()
      try {
        await itemOrdersCol.add({
          item_name: `${item.data.manufacturer} ${item.data.series} ${item.data.model}`,
          item_ref: item.path,
          event_ref: eventDoc.path,
          start: dateTimeStart,
          end: dateTimeEnd,
          qty: qtyInt,
          req_by: '',
          pulled_by: '',
          loaded_by: '',
          returned_by: '',
          category: item.data.category
        })
        .then(async(response) => {
          await eventOrdersCol.add({
            order_ref: response.path
          })
        });
      }
      catch (err) {
        alert('Error adding order: ', err);
      }
    } else {
      alert(`Error: invalid order quantity:
        ${qtyInt <= 0
          ? 'Order Quantity must be a number higher than zero'
          : 'Order Quantity exceeds total in stock'}`)
    }

  }

})



CreatePullOrderPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
  eventDoc: PropTypes.any,
  item: PropTypes.any,
};

export default withStyles(styles)(CreatePullOrderPrompt);
