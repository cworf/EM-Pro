import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { Collection } from 'firestorter';

import EventInventoryTableRow from './EventInventoryTableRow'


const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    background: '#333942',
    marginBottom: 24
  },
  table: {
    minWidth: 700,
  },
});

const EventInventoryTable = observer(class EventInventoryTable extends Component {

  eventOrdersColRef = new Collection(`${this.props.eventDoc.path}/orders`);
  state = {
    hasOrders: false
  }

  componentWillReceiveProps(newProps) {
    if (newProps.eventDoc !== this.props.eventDoc) {
      this.eventOrdersColRef.path = `${newProps.eventDoc.path}/orders`;
    }
  }

  handleHasOrders = () => {
    this.setState({hasOrders: true})
  }


  render(){
    const { classes, category } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            {
              this.state.hasOrders
              ?<TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Pulled</TableCell>
                <TableCell>Loaded</TableCell>
                <TableCell>Returned</TableCell>
              </TableRow>
              :<TableRow>
                <TableCell align='center'>No {category} equipment has been reserved for this event</TableCell>
              </TableRow>
            }


            </TableHead>
          <TableBody>
          {this.eventOrdersColRef.docs.map(orderRefDoc =>
            <EventInventoryTableRow
              order_ref={orderRefDoc.data.order_ref}
              category={category}
              onHasOrders={this.handleHasOrders}
              />
          )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
});

EventInventoryTable.propTypes = {
  eventDoc: PropTypes.any.isRequired,
  category: PropTypes.string
}

export default withStyles(styles)(EventInventoryTable);
