import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {compose} from 'recompose'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import './InventoryOrders.css'

import InventoryOrdersRow from './InventoryOrdersRow'

function InventoryOrders({orders, onRowClick}){

  return (
    <Grid container spacing={0} style={{marginTop: 30}}>
      <Grid item xs={6}>
        <Typography variant="display1" gutterBottom>
          Orders
        </Typography>
      </Grid>
      <Grid item xs={6} style={{display:'flex', justifyContent:'flex-end'}}>
        <span className='future-key'>Future Event</span>
        <span className='now-key'>Current Event</span>
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  );
}

InventoryOrders.propTypes = {
  orders: PropTypes.any.isRequired
}

export default compose(
  observer,
)(InventoryOrders);
