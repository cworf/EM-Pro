import React from 'react';
import {observer, inject} from 'mobx-react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {compose} from 'recompose'
import withAuthorization from '../Session/withAuthorization'
import withData from '../Session/withData'


class InventoryDetail extends React.Component {

  render(){
    const {
      dataStore : {dynamicDocs},
      userStore: {user},
      match
    } = this.props

    const item = dynamicDocs.get(`companies/${user.data.company}/inventory/${match.params.id}`)
    if (!item) return null
    const {
      data: {
        model, manufacturer, series, in_stock, name, inventory
      }
    } = item

    return (
      <div>
        <Typography variant="display1" gutterBottom>
          {manufacturer} {series} {model}
        </Typography>
        <Divider />
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;
export default compose(
  withAuthorization(authCondition),
  withData((props, company) => (
    [`companies/${company}/inventory/${props.match.params.id}`]
  )),
  inject('userStore', 'dataStore'),
  observer,
)(InventoryDetail);
