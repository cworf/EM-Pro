import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Document } from 'firestorter';
import {observer} from 'mobx-react';

const GetEventDoc = observer(class GetEventDoc extends Component {

  eventDoc = new Document(this.props.eventRef)

  // componentWillReceiveProps(newProps) {
  //   if (newProps.eventRef !== this.props.eventRef) {
  //     this.eventDoc.path = newProps.eventDoc;
  //   }
  // }

  render(){

    return (
      <div>
        {this.eventDoc.data.title}
      </div>
    );
  }
})

GetEventDoc.propTypes = {
  eventRef: PropTypes.any.isRequired
}

export default GetEventDoc;
