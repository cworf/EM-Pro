import React from 'react';
import {Document} from 'firestorter';
import {observer, inject} from 'mobx-react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {compose} from 'recompose'
import withAuthorization from '../Session/withAuthorization'


class InventoryDetail extends React.Component {

  item = new Document()

  componentWillReceiveProps(newProps) {
    this.item.path = `companies/${newProps.userStore.user.data.company}/inventory/${newProps.match.params.id}`;
  }

  render(){
    console.log(this.item);
    console.log(this.props.userStore.user.data);
    if (!this.item.data) return null
    const {
      data: {
        model, manufacturer, series, in_stock, name, inventory
      }
    } = this.item

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
  inject('userStore'),
  observer,
)(InventoryDetail);
