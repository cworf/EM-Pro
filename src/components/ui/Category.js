import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// import inventory from '../../assets/data/inventory';
import Grid from 'material-ui/Grid';
import {observer} from 'mobx-react';
import {inventory} from '../appStore';

import InventoryCard from './InventoryCard';
import InventoryTable from './InventoryTable';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    background: '#292e35',
  }
});

const Category = observer(function Category(props) {
  const { classes, types, picker } = props;
  if (types) {
    return (
      <div className={classes.root}>
        {types.map(function(type, i){
          return (
            <ExpansionPanel key={i} className={classes.paper}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{type}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                { picker //render picker table
                  ? <InventoryTable type={type} />
                  : /* else render cards */ <Grid container spacing={24}>
                    {inventory.docs.map((item) =>
                      item.data.type === type
                      ? <Grid key={item.id} item xs={6} sm={3}>
                      <InventoryCard item={item.data} />
                    </Grid>
                    : null
                  )}
                </Grid>
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </div>
    );
  } else {
    return null
  }

});

Category.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.string,
  types: PropTypes.array,
  picker: PropTypes.bool,
};

export default withStyles(styles)(Category);
