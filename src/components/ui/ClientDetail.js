import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 20,
    height: 'calc(100vh - 104px)',
  }),
  outer: {
    flexGrow: 1
  },
});

function ClientDetail({ classes, client: {company, first_name, last_name} }) {
  return (
    <div className={classes.outer}>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          details about {company}
        </Typography>
        <Typography variant="caption">
          {`${first_name} ${last_name}`}
        </Typography>
      </Paper>
    </div>
  );
}

ClientDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientDetail);
