import React from 'react';
import AllInventory from './AllInventory'
import InventoryDetail from './InventoryDetail'
import Paper from 'material-ui/Paper';
import { Switch, Route } from 'react-router-dom';

function Inventory(props){

  return (
    <Paper style={{maxWidth:950,
      padding: 20,
      background: '#2d323a',
      margin: 'auto',}}>
      <Switch>
        <Route exact path='/inventory' component={AllInventory} />
        <Route path='/inventory/:id' component={InventoryDetail} />
      </Switch>
    </Paper>
  );
}

Inventory.propTypes = {

}

export default Inventory;
