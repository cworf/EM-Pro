import React from 'react';
import {compose} from 'recompose'
import withAuthorization from '../Session/withAuthorization'
import withData from '../Session/withData'
import {observer, inject} from 'mobx-react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';



class VenueDetail extends React.Component {

  render(){
    const {
      dataStore : {dynamicDocs, dynamicCols},
      userStore: {user: {data: {company}}},
      match: {params: {id}}
    } = this.props

    const venue = dynamicDocs.get(`companies/${company}/venues/${id}`)
    const stages = dynamicCols.get(`companies/${company}/venues/${id}/stages`)

    if (!(venue && stages)) return null

    return (
      <div>
        <Typography variant="display1" gutterBottom>
          {venue.data.name}
        </Typography>
        <Divider />
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;
export default compose(
  withAuthorization(authCondition),
  withData((props, company) => ([
    `companies/${company}/venues/${props.match.params.id}`,
    `companies/${company}/venues/${props.match.params.id}/stages`
  ])),
  inject('userStore', 'dataStore'),
  observer,
)(VenueDetail);
