import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {compose} from 'recompose';
import withData from '../Session/withData'

const EventClient = ({dataStore, client}) => {
  const {dynamicDocs} = dataStore,
  eventClientDoc = dynamicDocs.get(client)
  if (!eventClientDoc) return null
  const {data : {first_name, phone}} = eventClientDoc
  return (
    <div>
      {phone}
      {first_name}
    </div>
  );
}

EventClient.propTypes = {
  client: PropTypes.string.isRequired,
}

export default compose(
  withData(({client}) => [client]),
  inject('dataStore'),
  observer,
)(EventClient);
