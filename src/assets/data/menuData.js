import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import CalendarIcon from 'material-ui-icons/DateRange';
import StorageIcon from 'material-ui-icons/Storage';
import PlaceIcon from 'material-ui-icons/Place';
import GroupIcon from 'material-ui-icons/Group';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import LocalActivityIcon from 'material-ui-icons/LocalActivity';
import ContactsIcon from 'material-ui-icons/Contacts';
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
        <StorageIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItem>
  </div>
);

export const middleMenuItems = (
  <div>

      <ListItem button  component={Link} to="/Venues">
        <ListItemIcon>
          <LocalActivityIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Venues" />
      </ListItem>
      <ListItem button  component={Link} to="/Clients">
        <ListItemIcon>
          <ContactsIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>

  </div>
);

export const bottomMenuItems = (
  <div>

      <ListItem button  component={Link} to="/">
        <ListItemIcon>
          <PlaceIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Locations" />
      </ListItem>
      <ListItem button  component={Link} to="/">
        <ListItemIcon>
          <GroupIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Staff" />
      </ListItem>
      <ListItem button  component={Link} to="/">
        <ListItemIcon>
          <AccountBoxIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="My Account" />
      </ListItem>

  </div>
);
