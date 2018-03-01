import React from 'react';
import VenuePanel from '../ui/VenuePanel';
import {venues} from '../../assets/data/venues';

function Venues(props){

  return (
    <div>
      {Object.keys(venues).map(venueId => <VenuePanel venue={venues[venueId]} />)}

    </div>
  );
}

export default Venues;
