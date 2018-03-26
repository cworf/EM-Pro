import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

class VenueMap extends Component {

  componentDidUpdate(prevProps, prevState) {
    this.loadMap();
  }

  componentDidMount() {
    this.loadMap()
  }

  loadMap() {
    if (this.props && this.props.google && this.props.lat) {
      // google is available
      const {google, lat, lng, name} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = findDOMNode(mapRef);

      let zoom = 17;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);

      new google.maps.Marker({
          position: {lat, lng},
          map: this.map,
          title: name
        });
    }
  }

  render(){
    const style = {
      width: '100%',
      height: '100%',
      color: 'yellow',
    }

    return (
      <div ref='map' style={style}>
        Loading map...
      </div>
    );
  }
}

VenueMap.propTypes = {
  google: PropTypes.any,
  lat: PropTypes.number,
  lng: PropTypes.number,
  name: PropTypes.string,
}

export default VenueMap;
