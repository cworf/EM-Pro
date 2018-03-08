import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { Collection } from 'firestorter';
import firebase from 'firebase';


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

class EventInventoryTable extends Component {

  constructor(props){
    super(props)
    this.eventOrdersColRef = new Collection(
    	firebase  //<---- btw this is written as "firebase()" in the docs, but only works without the parentheses
    		.firestore()
    		.collection(`${this.props.eventDoc.path}/orders`)
      );
  }

  componentWillReceiveProps(newProps) {
    this.eventOrdersColRef = new Collection(
    	firebase  //<---- btw this is written as "firebase()" in the docs, but only works without the parentheses
    		.firestore()
    		.collection(`${this.props.eventDoc.path}/orders`)
      );
  }

  render(){
    const { classes, category } = this.props;
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
            {console.log(this.eventOrdersColRef.ref)}
          {this.eventOrdersColRef.docs.map(orderRefDoc => {
            console.log(orderRefDoc);
            const {data} = orderRefDoc;
            const {order_ref} = data; //inventory / item /order collection / document reference path
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
}

EventInventoryTable.propTypes = {
  eventDoc: PropTypes.any.isRequired,
  category: PropTypes.string
}

export default observer(withStyles(styles)(EventInventoryTable));
