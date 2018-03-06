import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
});

function DetailBox(props){
  const { classes, section, sectionName, event } = props;
  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          {Object.keys(section).map((fieldName, i) =>
          <Grid key={i} item xs={12} sm={6}>
            {props.onRenderOrEdit(event, sectionName, fieldName)}
          </Grid>)}
        </Grid>
      </Paper>
    </div>
  );
}

DetailBox.propTypes = {
  section: PropTypes.object,
  event: PropTypes.object,
  onRenderOrEdit: PropTypes.func.isRequired,
  sectionName: PropTypes.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(DetailBox);
