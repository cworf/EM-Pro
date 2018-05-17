import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withData from '../Session/withData';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom'

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

class InventoryTable extends React.Component{

  render(){
    const {
      dataStore: {inventory},
      type, classes, eventDoc, picker, stock
    } = this.props

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Name</TableCell>
              <TableCell numeric>Inventory Total</TableCell>
              <TableCell numeric>Available</TableCell>
              {picker && <TableCell>Pull</TableCell>}
              {stock && <TableCell>Details</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.docs.map(item => {
              const {id, data} = item,
              {model, manufacturer, series, in_stock, name, inventory} = data;
              return ( data.type === type
                && <TableRow key={id}>
                    <TableCell>{manufacturer} {series} {model}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell padding='dense' numeric>{stock ? <RenderOrEdit noLabel small eventDoc={item} type='number' field='inventory' /> : inventory}</TableCell>
                    <TableCell padding='dense' numeric>{in_stock}</TableCell>
                    {picker &&
                      <TableCell padding='checkbox'>
                        <CreatePullOrderPrompt item={item} eventDoc={eventDoc} />
                      </TableCell>
                    }
                    {stock &&
                      <TableCell padding='checkbox'>
                        <Button
                          size='small'
                          variant='raised'
                          color='secondary'
                          component={Link}
                          to={`/inventory/${id}`}
                        >
                          Details
                        </Button>
                      </TableCell>
                    }
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

InventoryTable.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.object.isRequired,
  eventDoc: PropTypes.any,
  picker: PropTypes.bool,
  stock: PropTypes.bool,
}

const sortInventory = (props, collection) => (
  collection.ref.orderBy('manufacturer', 'asc')
)

export default compose(
  withData(['/inventory'], [sortInventory]),
  inject('dataStore'),
  withStyles(styles),
  observer
)(InventoryTable);
