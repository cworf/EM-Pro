import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

function MaintenanceTicketList(props){

  return (
    <div>
      <Typography variant="display1" gutterBottom>
        Maintenance Tickets
      </Typography>
      <Paper>
        <Typography variant="body" gutterBottom style={{padding:20}}>
          No Maintenance Tickets have beehn created for this item
        </Typography>
      </Paper>
    </div>
  );
}

MaintenanceTicketList.propTypes = {

}

export default MaintenanceTicketList;
