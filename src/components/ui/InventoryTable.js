import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {inventory} from '../appStore';
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

const InventoryTable = observer(class InventoryTable extends React.Component{

  render(){
    const {items, type, classes} = this.props
    console.log(items);
    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Name</TableCell>
                <TableCell numeric>Total in Stock</TableCell>
                <TableCell>Pull</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.docs.map(item => {
                const {id, data} = item,
                {model, manufacturer, series, inStock, name} = data;
                return ( data.type === type
                  ?<TableRow key={id}>
                      <TableCell>{manufacturer} {series} {model}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell numeric>{inStock}</TableCell>
                      <TableCell padding='checkbox'><Button size="small" variant='raised' color="primary">
                        Select Qty
                      </Button></TableCell>
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
}

export default withStyles(styles)(InventoryTable);
