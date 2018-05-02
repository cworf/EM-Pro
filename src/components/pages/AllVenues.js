import React from 'react';
import VenuePanel from '../ui/VenuePanel';
// import venues from '../../assets/data/venues';
import {venues} from '../appStore'
import {observer} from 'mobx-react';

const AllVenues = observer(function AllVenues(props){

  return (
    <div>
      {venues.docs.map(venue =>
        <VenuePanel key={venue.id} venue={venue} />)}

    </div>
  );
});

export default AllVenues;
