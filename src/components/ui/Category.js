import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {inventory} from '../../assets/data/inventory';
import Grid from 'material-ui/Grid';

import InventoryCard from './InventoryCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function Category(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {props.types.map(function(type, i){
        return (
          <ExpansionPanel key={i}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{type}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={24}>
                {Object.keys(inventory).map(function(modelName, i){
                  return inventory[modelName].type === type
                    ? <Grid key={i} item xs={6} sm={3}>
                        <InventoryCard item={inventory[modelName]} />
                      </Grid>
                    : null
                })}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </div>
  );
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.string,
  types: PropTypes.array,
};

export default withStyles(styles)(Category);