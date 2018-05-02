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
import {Collection} from 'firestorter';
import {observer} from 'mobx-react';
import { Link } from 'react-router-dom'

import VenueMapContainer from './VenueMapContainer';
import AddStage from './AddStage';

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
    alignItems: 'stretch',
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
    display: 'block',
    position: 'relative'
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

const Venues = observer(class Venues extends React.Component {

  stages = new Collection(`${this.props.venue.path}/stages`)

  render(){
    const { classes, venue } = this.props;
    const { contact_info, name, physical_address } = venue.data;
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
              <Typography className={classes.secondaryHeading}>{this.stages.docs.length} {this.stages.docs.length === 1 ? 'Stage' : 'Stages'}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              <Typography style={{textDecoration: 'underline', marginBottom: '10px'}} variant="subheading">
                Contact Info
              </Typography>
              <Typography variant="body1">
                <strong>Liaison:</strong>
                <span className={classes.helper}>
                  {contact_info.liaison}
                </span>
                <strong>Phone Numbers:</strong>
                {Object.keys(contact_info.phoneNumbers).map((type, i) =>
                  <span key={i} className={classes.helper}>
                    <strong>{type}:</strong> {contact_info.phoneNumbers[type]}
                  </span>
                )}
                <strong>Emails:</strong>
                  {contact_info.emails.map((email, i) =>
                    <span key={i} className={classes.helper}>
                      {email}
                    </span>
                  )}
                <strong>Mailing Address:</strong>
                  <span className={classes.helper}>
                    {street } <br />
                  {street2 ? street2 : null}{street2 ? <br /> : null }
                    {city}, {state} {zip}
                  </span>
              </Typography>
            </div>
            <div className={classes.column}>
                <VenueMapContainer
                  address={`${physical_address.street} ${physical_address.zip}`}
                  name={name}
                />
            </div>
            <div className={classNames(classes.column, classes.helper)}>
              <Typography variant="subheading">
                Stages
              </Typography>

              {this.stages.docs.map(stage =>
                <Chip key={stage.id}
                  label={stage.data.name}
                  onClick={handleClick}
                  className={classes.chip}
                />
              )}
              <AddStage venuePath={this.props.venue.path} />
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button component={Link} to={`/venues/${venue.id}`} size="small" variant="raised" color="primary">
              Details
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
})

Venues.propTypes = {
  classes: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
};

export default withStyles(styles)(Venues);
