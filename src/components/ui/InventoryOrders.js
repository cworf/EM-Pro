import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {compose} from 'recompose'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import InventoryOrdersRow from './InventoryOrdersRow'

function InventoryOrders({orders, onRowClick}){

  return (
    <Paper>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Qty</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
        {orders.docs.map(order =>
          <InventoryOrdersRow key={order.id}
            order={order}
            event_ref={order.data.event_ref}
            onRowClick={onRowClick}
            />
        )}
        </TableBody>
      </Table>
    </Paper>
  );
}

InventoryOrders.propTypes = {
  orders: PropTypes.any.isRequired
}

export default compose(
  observer,
)(InventoryOrders);
