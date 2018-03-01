import React from 'react';
import PropTypes from 'prop-types';

function ClientDetail(props){

  return (
    <div>
      <h1>Client Details for {props.client.company}</h1>
    </div>
  );
}

ClientDetail.propTypes = {
  client: PropTypes.object,
};

export default ClientDetail;
