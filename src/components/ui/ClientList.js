import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withData from '../Session/withData';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function ClientList({classes, onClientClick, dataStore: {clients}}) {
  return (
    <div className={classes.root}>
      <List>
        {clients.docs.map((client, i) => {
          const {name, company, picture} = client.data;
          return (
            <ListItem key={i} button divider onClick={onClientClick(client.data)}>
              <Avatar  src={picture} />
              <ListItemText primary={company} secondary={name.last + ', ' + name.first} />
            </ListItem>
          )
        })}
      </List>
    </div>
  );
};

ClientList.propTypes = {
  classes: PropTypes.object.isRequired,
  onClientClick: PropTypes.func
};

// const clientSort = (props, collection) => (
//   collection.ref.orderBy('last-name', 'asc')
// )

export default compose(
  withData(['/clients']),
  inject('dataStore'),
  withStyles(styles),
  observer
)(ClientList);
