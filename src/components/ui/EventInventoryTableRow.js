import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableRow } from 'material-ui/Table';
import { Document } from 'firestorter';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import red from 'material-ui/colors/red';
import './EventInventoryTableRow.css'

import RenderOrEdit from './RenderOrEdit'
import AreYouSure from './AreYouSure'

const styles = theme => ({
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: red[500],
    opacity: 0,
    transition: '.2s ease'
  },
  relative: {
    position: 'relative',
  }
});

const EventInventoryTableRow = observer(class EventInventoryTableRow extends Component {

  ItemOrderDoc = new Document(this.props.order_ref); //this references the orders/{orderID} document

  componentWillReceiveProps(newProps) {
    if (newProps.order_ref !== this.props.order_ref) {
      this.ItemOrderDoc.path = newProps.order_ref;
    }
  }

  handleDelete = () => {
    this.ItemOrderDoc.delete()
    this.props.document.delete()
  }


  render(){
    if (!this.ItemOrderDoc.data) return null
    const { category, classes } = this.props;
    const { item_name, pulled_by, loaded_by, returned_by, qty} = this.ItemOrderDoc.data
    if (qty ===0) {
      this.handleDelete()
    }
    if (this.ItemOrderDoc.data.category === category) {
      this.props.onHasOrders()
    }
    return ( this.ItemOrderDoc.data.category === category
      ?<TableRow className='show-del' key={this.ItemOrderDoc.id}>
        <TableCell>
          {item_name}
        </TableCell>
        <TableCell className={classes.relative}>
          <RenderOrEdit small noLabel eventDoc={this.ItemOrderDoc} field='qty' type='number'/>
          <AreYouSure question='Are you sure you want to delete this order?'
            acceptBtn='Take it away'
            cancelBtn='No! take me back.'
            onAccept={this.handleDelete} styles={{
            position: 'absolute',
            right: 0,
            top: 0,
            opacity: 0,
            transition: '.2s ease'
          }}>
            <DeleteIcon />
          </AreYouSure>
        </TableCell>
        <TableCell padding='checkbox'>{pulled_by ? pulled_by : <Button color='primary' size='small'>Pull</Button>}</TableCell>
        <TableCell padding='checkbox'>{loaded_by ? loaded_by : <Button color='primary' size='small'>Load</Button>}</TableCell>
        <TableCell padding='checkbox'>{returned_by ? returned_by : <Button color='primary' size='small'>Return</Button>}</TableCell>
      </TableRow>

      : null
    );
  }
});

EventInventoryTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  document: PropTypes.any.isRequired,
  category: PropTypes.string,
  order_ref: PropTypes.string,
  onHasOrders: PropTypes.func,
}

export default withStyles(styles)(EventInventoryTableRow);
