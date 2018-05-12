import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import withData from '../Session/withData';
import VenuePanel from '../ui/VenuePanel';
// import venues from '../../assets/data/venues';

function AllVenues({dataStore: {venues}}){

  return (
    <div>
      {venues.docs.map(venue =>
        <VenuePanel key={venue.id} venue={venue} />)}
    </div>
  );
};

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  withData(['/venues']),
  inject('dataStore'),
  observer
)(AllVenues);
