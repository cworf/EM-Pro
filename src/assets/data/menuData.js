import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import CalendarIcon from 'material-ui-icons/DateRange';
import EqualizerIcon from 'material-ui-icons/Equalizer';
import EventIcon from 'material-ui-icons/EventSeat';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ErrorIcon from 'material-ui-icons/Error';
import { Link } from 'react-router-dom';


export const mailFolderListItems = (
  <div>
      <ListItem button  component={Link} to="/">
        <ListItemIcon>
          <CalendarIcon />
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItem>
      <ListItem button  component={Link} to="/Inventory">
        <ListItemIcon>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
      </ListItem>

  </div>
);

export const otherMailFolderListItems = (
  <div>

      <ListItem button  component={Link} to="/Venues">
        <ListItemIcon>
          <MailIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Venues" />
      </ListItem>
      <ListItem button  component={Link} to="/Clients">
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>
      <ListItem button  component={Link} to="/Conflicts">
        <ListItemIcon>
          <ErrorIcon />
        </ListItemIcon>
        <ListItemText primary="Conflicts" />
      </ListItem>

  </div>
);
