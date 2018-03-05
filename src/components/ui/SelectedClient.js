import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectedClient extends Component {
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

SelectedClient.propTypes = {
  client: PropTypes.object.isRequired,
}

export default SelectedClient;
