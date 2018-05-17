import React from 'react';
import { Switch, Route } from 'react-router-dom'
import AllVenues from './AllVenues'
import VenueDetail from './VenueDetail'
import Paper from 'material-ui/Paper';

const Venues = () => (
  <Paper style={{maxWidth:1000,
    padding: 20,
    background: '#2d323a',
    margin: 'auto',}}
  >
    <Switch>
      <Route exact path='/venues' component={AllVenues} />
      <Route path='/venues/:id' component={VenueDetail} />
    </Switch>
  </Paper>
)

export default Venues;
