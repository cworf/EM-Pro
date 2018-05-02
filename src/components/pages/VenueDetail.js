import React from 'react';
import {Document, Collection} from 'firestorter';
import {observer} from 'mobx-react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';



const VenueDetail = observer(class VenueDetail extends React.Component {

  venue = new Document(`venues/${this.props.match.params.id}`)
  stages = new Collection(`venues/${this.props.match.params.id}/stages`)

  render(){
    return (
      <div>
        <Typography variant="display1" gutterBottom>
          {this.venue.data.name}
        </Typography>
        <Divider />
      </div>
    );
  }
})

export default VenueDetail;
