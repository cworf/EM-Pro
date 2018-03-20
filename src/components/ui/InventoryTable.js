import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {inventory} from '../appStore';
import Button from 'material-ui/Button';

import CreatePullOrderPrompt from './CreatePullOrderPrompt';
import RenderOrEdit from './RenderOrEdit';

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

const InventoryTable = observer(class InventoryTable extends React.Component{


  render(){
    const {type, classes, eventDoc, picker, stock} = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Name</TableCell>
              <TableCell numeric>Inventory Total</TableCell>
              <TableCell numeric>Available</TableCell>
              {picker ? <TableCell>Pull</TableCell> : null}
              {stock ? <TableCell>Details</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.docs.map(item => {
              const {id, data} = item,
              {model, manufacturer, series, in_stock, name, inventory} = data;
              return ( data.type === type
                ?<TableRow key={id}>
                    <TableCell>{manufacturer} {series} {model}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell numeric>{stock ? <RenderOrEdit noLabel small eventDoc={item} type='number' field='inventory' /> : inventory}</TableCell>
                    <TableCell numeric>{in_stock}</TableCell>
                    {picker ? <TableCell padding='checkbox'><CreatePullOrderPrompt item={item} eventDoc={eventDoc} /></TableCell> : null}
                    {stock ? <TableCell padding='checkbox'><Button size='small' variant='raised' color='secondary'>Details</Button></TableCell> : null}
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

InventoryTable.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.object.isRequired,
  eventDoc: PropTypes.any,
  picker: PropTypes.bool,
  stock: PropTypes.bool,
}

export default withStyles(styles)(InventoryTable);
