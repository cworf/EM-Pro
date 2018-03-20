import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { Document } from 'firestorter';

import DocSelector from '../ui/DocSelector';

const EventVenue = observer(class EventVenue extends Component {

  eventVenueDoc = new Document(this.props.venue);

  render(){
    const {data, path, snapshot} = this.eventVenueDoc
    if (!snapshot) return null
    const { name } = data

    return (
      <div>
        {name}
        {!this.props.hasStage ?
        <DocSelector stage onDocSelect={this.props.onDocSelect} venuePath={path}/> : null}
      </div>
    );
  }
})

EventVenue.propTypes = {
  venue: PropTypes.string.isRequired,
  onDocSelect: PropTypes.func.isRequired,
  hasStage: PropTypes.bool.isRequired,
}

export default EventVenue;
