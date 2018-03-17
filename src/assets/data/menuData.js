import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import CalendarIcon from 'material-ui-icons/DateRange';
import EqualizerIcon from 'material-ui-icons/Equalizer';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import { Link } from 'react-router-dom';


export const topMenuItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <CalendarIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Calendar" />
    </ListItem>
    <ListItem button  component={Link} to="/Inventory">
      <ListItemIcon>
        <EqualizerIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItem>
  </div>
);

export const bottomMenuItems = (
  <div>

      <ListItem button  component={Link} to="/Venues">
        <ListItemIcon>
          <MailIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Venues" />
      </ListItem>
      <ListItem button  component={Link} to="/Clients">
        <ListItemIcon>
          <DeleteIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>

  </div>
);
