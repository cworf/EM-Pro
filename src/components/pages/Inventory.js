import React from 'react';
import AllInventory from './AllInventory'
import InventoryDetail from './InventoryDetail'
import { Switch, Route } from 'react-router-dom';

function Inventory(props){

  return (
    <Switch>
      <Route exact path='/inventory' component={AllInventory} />
      <Route path='/inventory/:id' component={InventoryDetail} />
    </Switch>
  );
}

Inventory.propTypes = {

}

export default Inventory;
