import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {inventory} from '../appStore';

import { Collection } from 'firestorter';


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

const EventIventoryTable = observer(class EventIventoryTable extends Component {

  render(){
    const { classes, eventDoc, category } = this.props;
    console.log(eventDoc.path);
    const eventOrdersCol = new Collection(() => `${eventDoc.path}/orders`); //event sub collection
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Pulled</TableCell>
              <TableCell>Loaded</TableCell>
              <TableCell>Returned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {eventOrdersCol.docs.map(orderRefDoc => {
            console.log(orderRefDoc);
            let {data} = orderRefDoc,
            {order_ref} = data; //inventory / item /order collection / document reference path
            const ItemOrderDoc = new Document(order_ref); //item sub collection reference
            const { item_name, pulled_by, loaded_by, returned_by } = ItemOrderDoc.data
            return ( ItemOrderDoc.data.category === category
              ?<TableRow key={ItemOrderDoc.id}>
                <TableCell> {item_name}</TableCell>
                <TableCell>{pulled_by}</TableCell>
                <TableCell>{loaded_by}</TableCell>
                <TableCell>{returned_by}</TableCell>
              </TableRow>
              : null
            );
          })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
})

EventIventoryTable.propTypes = {
  eventDoc: PropTypes.any.isRequired,
  category: PropTypes.string
}

export default withStyles(styles)(EventIventoryTable);
