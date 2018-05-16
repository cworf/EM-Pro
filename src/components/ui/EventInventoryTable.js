import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {compose} from 'recompose'
import withData from '../Session/withData'
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

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

class EventInventoryTable extends Component {

  state = {
    hasOrders: false
  }

  handleHasOrders = () => {
    this.setState({hasOrders: true})
  }


  render(){
    const {
      dataStore: {dynamicCols},
      classes,
      category
    } = this.props,
    eventOrdersColRef = dynamicCols.get(`${this.props.eventDoc.path}/orders`)
    if (!eventOrdersColRef) return null

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
          {eventOrdersColRef.docs.map(orderRefDoc =>
            <EventInventoryTableRow key={orderRefDoc.id}
              document={orderRefDoc}
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
};

EventInventoryTable.propTypes = {
  eventDoc: PropTypes.any.isRequired,
  category: PropTypes.string
}

export default compose(
  withData(({eventDoc}) => [`${eventDoc.path}/orders`]),
  inject('dataStore'),
  withStyles(styles),
  observer,
)(EventInventoryTable);
