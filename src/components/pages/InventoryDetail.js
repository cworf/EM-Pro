import React from 'react';
import {Document} from 'firestorter';
import {observer, inject} from 'mobx-react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {compose} from 'recompose'
import withAuthorization from '../Session/withAuthorization'
import withData from '../Session/withData'


class InventoryDetail extends React.Component {

  render(){
    console.log(this.props.dataStore.dynamicDocs);
    const {dynamicDocs} = this.props.dataStore

    const item = dynamicDocs.get(`companies/${this.props.userStore.user.data.company}/inventory/${this.props.match.params.id}`)
    console.log(`companies/${this.props.userStore.user.data.company}/inventory/${this.props.match.params.id}`);
    console.log(item);
    // if (!item) return null
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
