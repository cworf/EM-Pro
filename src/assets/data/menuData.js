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
    <Link to='/' color='primary'>
      <ListItem button>
        <ListItemIcon>
          <CalendarIcon />
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItem>
    </Link>
    <Link to='/inventory'>
      <ListItem button>
        <ListItemIcon>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
      </ListItem>
    </Link>
    <Link to='/events'>
      <ListItem button>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItem>
    </Link>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <Link to='/venues'>
      <ListItem button>
        <ListItemIcon>
          <MailIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Venues" />
      </ListItem>
    </Link>
    <Link to='/clients'>
      <ListItem button>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>
    </Link>
    <Link to='/conflicts'>
      <ListItem button>
        <ListItemIcon>
          <ErrorIcon />
        </ListItemIcon>
        <ListItemText primary="Conflicts" />
      </ListItem>
    </Link>
  </div>
);
