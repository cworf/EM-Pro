import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {clients} from '../../assets/data/clients';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function ClientList(props) {

  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
        {Object.keys(clients).map((clientId, i) => {
          const client = clients[clientId]
          const {name, company, picture} = client
          return (
            <ListItem key={i} button divider onClick={props.onClientClick(client)}>
              <Avatar  src={picture} />
              <ListItemText primary={company} secondary={name.last + ', ' + name.first} />
            </ListItem>
          )
        })}
      </List>
    </div>
  );
}

ClientList.propTypes = {
  classes: PropTypes.object.isRequired,
  onClientClick: PropTypes.func
};

export default withStyles(styles)(ClientList);
