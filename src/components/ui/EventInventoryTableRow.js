import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableRow } from 'material-ui/Table';
import { Document } from 'firestorter';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    background: '#333942',
  },
  table: {
    minWidth: 700,
  },
});

const EventInventoryTableRow = observer(class EventInventoryTableRow extends Component {
  constructor(props){
    super(props);
    this.ItemOrderDoc = new Document(props.order_ref);
    console.log(this.itemOrderDoc);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.order_ref !== this.props.order_ref) {
      this.ItemOrderDoc.path = newProps.order_ref;
    }
  }


  render(){
    console.log(this.itemOrderDoc);
    const { category } = this.props;
    const { item_name, pulled_by, loaded_by, returned_by, qty } = this.ItemOrderDoc.data
    if (this.ItemOrderDoc.data.category === category) {
      this.props.onHasOrders()
    }

    return ( this.ItemOrderDoc.data.category === category
      ?<TableRow key={this.ItemOrderDoc.id}>
        <TableCell> {item_name}</TableCell>
        <TableCell> {qty}</TableCell>
        <TableCell padding='checkbox'>{pulled_by ? pulled_by : <Button color='primary' size='small'>Pull</Button>}</TableCell>
        <TableCell padding='checkbox'>{loaded_by ? loaded_by : <Button color='primary' size='small'>Load</Button>}</TableCell>
        <TableCell padding='checkbox'>{returned_by ? returned_by : <Button color='primary' size='small'>Return</Button>}</TableCell>
      </TableRow>

      : null
    );
  }
});

EventInventoryTableRow.propTypes = {
  category: PropTypes.string,
  order_ref: PropTypes.string,
  onHasOrders: PropTypes.func,
}

export default withStyles(styles)(EventInventoryTableRow);
