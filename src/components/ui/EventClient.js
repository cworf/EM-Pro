import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {compose} from 'recompose';
import { Document } from 'firestorter';

class EventClient extends Component {

  eventClientDoc = new Document(this.props.client); //

  componentWillReceiveProps(newProps) {
    if (newProps.client !== this.props.client) {
      this.eventClientDoc.path = this.props.client;
    }
  }

  render(){
    const {data, snapshot} = this.eventClientDoc
    if (!snapshot) return null;
    const {first_name, phone} = data
    return (
      <div>
        {phone}
        {first_name}
      </div>
    );
  }
}

EventClient.propTypes = {
  client: PropTypes.string.isRequired,
}

export default compose(
  observer,
)(EventClient);
