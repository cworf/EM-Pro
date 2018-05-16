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
      dataStore : {dynamicDocs, dynamicCols},
      userStore: {user},
      match
    } = this.props

    const item = dynamicDocs.get(`companies/${user.data.company}/inventory/${match.params.id}`)
    const orders = dynamicCols.get(`companies/${user.data.company}/inventory/${match.params.id}/orders`)
    if (!(item && orders)) return null
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
        <Divider style={{marginTop: 10}} />
        <Typography variant="title" gutterBottom>
          {name}
        </Typography>
        <Typography variant="display2" gutterBottom>
          Order History
        </Typography>
        {orders.docs.map(order =>
          <div key={order.id}>
            {order.data.start} --
            {order.data.end}  --
            {order.data.qty}
          </div>
        )}

      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;
export default compose(
  withAuthorization(authCondition),
  withData((props, company) => ([
    `companies/${company}/inventory/${props.match.params.id}`,
    `companies/${company}/inventory/${props.match.params.id}/orders`
  ])),
  inject('userStore', 'dataStore'),
  observer,
)(InventoryDetail);
