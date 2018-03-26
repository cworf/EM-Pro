import {GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import VenueMap from './VenueMap'
import PropTypes from 'prop-types'
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCdY_PSleJpP0Esm8FlJ0IMUh0aqAvsmdc");
// Geocode.enableDebug();

const style = {
      width: '100%',
      height: 270,
    }

export class VenueMapContainer extends Component {

  state = {
    lat: null,
    lng: null,
  }

  componentWillReceiveProps(newProps){
    Geocode.fromAddress(newProps.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({lat, lng})
      },
      error => {
        console.error(error);
      }
    );
  }

  render(){
    const {google,name} = this.props
    const {lat, lng} = this.state
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={style}>
        <VenueMap google={google} lat={lat} lng={lng} name={name} />
      </div>
    )
  }
}

VenueMapContainer.propTypes = {
  google: PropTypes.object,
  loaded: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBO7M0BPTsz0E_zON20gCc0tOEzghez1RI',
})(VenueMapContainer);
