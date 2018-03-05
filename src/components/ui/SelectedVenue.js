import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectedVenue extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    return (
      <div>

      </div>
    );
  }
}

SelectedVenue.propTypes = {
  venue: PropTypes.object.isRequired,
}

export default SelectedVenue;
