import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import {inventoryCategories} from '../../assets/data/taxonomies';
import AddInventory from '../ui/AddInventory'

import Category from '../ui/Category';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: '#1b1d23',
    color: '#eef5ff',
  },
});

class Inventory extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={value} onChange={this.handleChange}>
            {Object.keys(inventoryCategories).map(function(key, i) {
            return <Tab key={i} label={key} />
          })}
          </Tabs>
        </AppBar>

        <AddInventory />
        {Object.keys(inventoryCategories).map(function(key, i) {
            return value === i && <TabContainer key={i}><Category category={key} types={inventoryCategories[key]} /></TabContainer>
          })}

        <AddInventory />
      </div>
    );
  }
}

Inventory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inventory);
