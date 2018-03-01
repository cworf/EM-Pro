import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

function handleClick() {
  alert('You clicked the Chip.');
}

function Venues(props) {
  const { classes } = props;
  const { physical_address, contact_info, stages } = props.venue;
  const { street, street2, city, state, zip } = contact_info.mailing_address;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Wilma</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Missoula, MT</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Typography variant="subheading">
              Contact Info
            </Typography>
            <Typography variant="body1">
              Liaison: {contact_info.liaison}
              <br/>
              Phone Numbers:
              <br />
              {Object.keys(contact_info.phoneNumbers).map(type =>
                `${type}: ${contact_info.phoneNumbers[type]}`
              )}
              Email: {contact_info.email}
              <br />
              Mailing Address: {street} {city}, {state} {zip}
            </Typography>
          </div>
          <div className={classes.column}>
            map goes here
          </div>
          <div className={classNames(classes.column, classes.helper)}>
            <Typography variant="subheading">
              Stages
            </Typography>
            <Chip
        avatar={<Avatar>MB</Avatar>}
        label="Clickable Chip"
        onClick={handleClick}
        className={classes.chip}
      />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Edit
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

Venues.propTypes = {
  classes: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
};

export default withStyles(styles)(Venues);
