import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { Document } from 'firestorter';

const EventClient = observer(class EventClient extends Component {

  eventClientDoc = new Document(this.props.client); //

  componentWillReceiveProps(newProps) {
    if (newProps.client !== this.props.client) {
      this.eventClientDoc.path = this.props.client;
    }
  }

  render(){
    const {data, id, snapshot} = this.eventClientDoc
    if (!snapshot) return null;
    const {name, company, phone} = data
    return (
      <div>
        {phone}
        {name.first}
      </div>
    );
  }
})

EventClient.propTypes = {
  client: PropTypes.string.isRequired,
}

export default EventClient;
