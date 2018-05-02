import React from 'react';
import { Switch, Route } from 'react-router-dom'
import AllVenues from './AllVenues'
import VenueDetail from './VenueDetail'

const Venues = () => {

  return (
    <Switch>
      <Route exact path='/venues' component={AllVenues} />
      <Route path='/venues/:id' component={VenueDetail} />
    </Switch>
  );
};

export default Venues;
