import React from 'react';
import {Document} from 'firestorter';
import {observer, inject} from 'mobx-react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {compose} from 'recompose'
import withAuthorization from '../Session/withAuthorization'


class InventoryDetail extends React.Component {

  item = new Document(`inventory/${this.props.match.params.id}`)

  render(){
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

export default compose(
  withAuthorization,
  observer,
)(InventoryDetail);
