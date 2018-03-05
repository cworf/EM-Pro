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

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
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
    alignItems: 'flex-start',
  },
  column: {
    flexBasis: '33.33%',
  },
  hasChildren: {
    display:'flex',
  },
  innerColumn: {
    flexBasis: '50%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `0px ${theme.spacing.unit * 2}px`,
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
  console.log(props.venue);
  const { classes } = props;
  const { contact_info, stages, name } = props.venue;
  const { street, street2, city, state, zip } = contact_info.mailing_address;
  const br = document.createElement('br');
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>{name}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{city}, {state}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{Object.keys(stages).length} {Object.keys(stages).length === 1 ? 'Stage' : 'Stages'}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Typography style={{textDecoration: 'underline', marginBottom: '10px'}} variant="subheading">
              Contact Info
            </Typography>
            <Typography variant="body1">
              <strong>Liaison:</strong>
              <div className={classes.helper}>
                {contact_info.liaison}
              </div>
              <strong>Phone Numbers:</strong>
              {Object.keys(contact_info.phoneNumbers).map(type =>
                <Typography className={classes.helper} variant="caption">
                  <strong>{type}:</strong> {contact_info.phoneNumbers[type]}
                </Typography>
              )}
              <strong>Emails:</strong>
                {contact_info.emails.map(email =>
                  <div className={classes.helper}>
                    {email}
                  </div>
                )}
              <strong>Mailing Address:</strong>
                <div className={classes.helper}>
                  {street } <br />
                {street2 ? street2 : null}{street2 ? <br /> : null }
                  {city}, {state} {zip}
                </div>
            </Typography>
          </div>
          <div className={classes.column}>
            map goes here
          </div>
          <div className={classNames(classes.column, classes.helper)}>
            <Typography variant="subheading">
              Stages
            </Typography>

            {Object.keys(stages).map(stageId =>
              <Chip
                label={stages[stageId].name}
                onClick={handleClick}
                className={classes.chip}
              />
            )}
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
