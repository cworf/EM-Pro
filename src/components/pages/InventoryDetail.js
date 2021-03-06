import React from 'react';
import {observer, inject} from 'mobx-react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import {compose} from 'recompose'
import withAuthorization from '../Session/withAuthorization'
import withData from '../Session/withData'
import Grid from 'material-ui/Grid';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import InventoryOrders from '../ui/InventoryOrders'
import EventDetail from '../pages/EventDetail';
import MaintenanceTicketList from '../ui/MaintenanceTicketList';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class InventoryDetail extends React.Component {

  state = {
    eventOpen: false,
    clickedEvent: null,
  };

  handleEventClose = () =>
    this.setState({ ...this.state, eventOpen: false });

  handleEventClick = (eventDoc) =>
    this.setState({...this.state, eventOpen: true, clickedEvent: eventDoc})

  render(){
    const {
      dataStore : {dynamicDocs, dynamicCols},
      userStore: {user: {data: {company}}},
      match: {params: {id}},
    } = this.props
    console.log(dynamicCols);
    const item = dynamicDocs.get(`companies/${company}/inventory/${id}`)
    const orders = dynamicCols.get(`companies/${company}/inventory/${id}/orders`)
    const tickets = dynamicCols.get(`companies/${company}/inventory/${id}/maintenance`)
    if (!(item && orders && tickets)) return null
    const {
      data: {
        model, manufacturer, series, in_stock, name, inventory, weight, image, type
      }
    } = item

    return (
      <div>
        <Typography variant="display2" gutterBottom>
          {manufacturer} {series} {model}
        </Typography>
        <Divider style={{marginTop: 10, marginBottom:15}} />
        <Typography variant="title" gutterBottom>
          {name}
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <img src={image} alt='inventory'/>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="display1" gutterBottom style={{marginTop:15}}>
              Details
            </Typography>
            <Divider style={{marginTop: 10, marginBottom:15}} />
            <Grid container>
              <Grid item xs={6}>
                <strong>Weight:</strong> {weight} lbs
              </Grid>
              <Grid item xs={6}>
                <strong>Type:</strong> {type}
              </Grid>
              <Grid item xs={6}>
                <strong>Currently Stocked:</strong> {inventory}
              </Grid>
              <Grid item xs={6}>
                <strong>Available:</strong> {in_stock}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <MaintenanceTicketList  />
        <InventoryOrders orders={orders} onRowClick={this.handleEventClick} />
        <Dialog
          fullScreen
          open={this.state.eventOpen}
          onClose={this.handleEventClose}
          transition={Transition}
        >
          <EventDetail onClickClose={this.handleEventClose} eventDoc={this.state.clickedEvent} />
        </Dialog>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;
export default compose(
  withAuthorization(authCondition),
  withData(({match:{params:{id}}}, company) => ([
    `companies/${company}/inventory/${id}`,
    `companies/${company}/inventory/${id}/orders`,
    `companies/${company}/inventory/${id}/maintenance`
  ]), ['', (props, collection) => (
    collection.ref.orderBy('start', 'desc')
  )]),
  inject('userStore', 'dataStore'),
  observer,
)(InventoryDetail);
