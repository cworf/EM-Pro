import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {compose} from 'recompose'
import withData from '../Session/withData'
import { withStyles } from 'material-ui/styles';
import { TableCell, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
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

class EventInventoryTableRow extends Component {

  handleDelete = () => {
    const {dataStore: {dynamicDocs}} = this.props,
    ItemOrderDoc = dynamicDocs.get(this.props.order_ref)
    ItemOrderDoc.delete()
    this.props.document.delete()
  }


  render(){
    const {
      dataStore: {dynamicDocs},
      classes, category
    } = this.props,
    ItemOrderDoc = dynamicDocs.get(this.props.order_ref)

    if (!ItemOrderDoc) return null

    const { item_name, pulled_by, loaded_by, returned_by, qty} = ItemOrderDoc.data
    if (qty ===0) {
      this.handleDelete()
    }
    if (ItemOrderDoc.data.category === category) {
      this.props.onHasOrders()
    }
    return ( ItemOrderDoc.data.category === category
      ?<TableRow className='show-del' key={ItemOrderDoc.id}>
        <TableCell>
          {item_name}
        </TableCell>
        <TableCell className={classes.relative}>
          <RenderOrEdit small noLabel eventDoc={ItemOrderDoc} field='qty' type='number'/>
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
};

EventInventoryTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  document: PropTypes.any.isRequired,
  category: PropTypes.string,
  order_ref: PropTypes.string,
  onHasOrders: PropTypes.func,
}

export default compose(
  withData(({order_ref}) => [order_ref]),
  inject('dataStore'),
  withStyles(styles),
  observer,
)(EventInventoryTableRow);
