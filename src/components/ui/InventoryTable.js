import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {inventory} from '../appStore';

import CreatePullOrderPrompt from './CreatePullOrderPrompt';

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
    const {items, type, classes, eventDoc} = this.props
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
                    <TableCell padding='checkbox'><CreatePullOrderPrompt item={item} eventDoc={eventDoc} /></TableCell>
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
}

export default withStyles(styles)(InventoryTable);
