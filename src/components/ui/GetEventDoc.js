import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {compose} from 'recompose'
import withData from '../Session/withData'
import { ListItem, ListItemText } from 'material-ui/List';


const GetEventDoc = ({dataStore: {dynamicDocs}, onListItemClick, eventRef}) => {

  const eventDoc = dynamicDocs.get(eventRef)
  if (!eventDoc) return null
  if (!eventDoc.data) return null
  return (
    <div>
      <ListItem button onClick={onListItemClick.bind(null,eventDoc)}>
        <ListItemText primary={eventDoc.data.title} />
      </ListItem>
    </div>
  );
}

GetEventDoc.propTypes = {
  eventRef: PropTypes.any.isRequired,
  onListItemClick:  PropTypes.func,
}

export default compose(
  withData(({eventRef}) => [eventRef]),
  inject('dataStore'),
  observer,
)(GetEventDoc);
