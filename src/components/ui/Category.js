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

import InventoryTable from './InventoryTable';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  altRoot: {
    maxHeight: '90vh',
    overflow: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    background: '#292e35',
  },
  details: {
    padding: 0,
  },
});

const Category = observer(function Category(props) {
  const { classes, types, picker, eventDoc } = props;
  if (types) {
    return (
      <div className={picker ? classes.altRoot : classes.root}>
        {types.map(function(type, i){
          return (
            <ExpansionPanel key={i} className={classes.paper}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{type}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={picker ? classes.details : classes.notDetails}>
                { picker //render picker table
                  ? <InventoryTable picker type={type} eventDoc={eventDoc} />
                  : <Grid container spacing={24}>
                    <InventoryTable stock type={type} eventDoc={eventDoc} />
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
  eventDoc: PropTypes.any,
};

export default withStyles(styles)(Category);
