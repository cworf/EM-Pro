import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function EventDetail(props) {

  const { classes, event } = props;

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={props.onClickClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {event.title}
          </Typography>
          <Button color="inherit" onClick={props.onClickClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItem>
      </List>
    </div>
  );
}

EventDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickClose: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDetail);
