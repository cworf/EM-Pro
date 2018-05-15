import React from 'react';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import Slide from 'material-ui/transitions/Slide';
import Sticky from 'react-sticky-el';
import './Clients.css'

import ClientDetail from '../ui/ClientDetail';
import ClientList from '../ui/ClientList';

class Clients extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selectedClient : null
    }
  }

  setClickedClient = client => () => {
    this.setState({...this.state, selectedClient:client})
  }

  render() {
    return (
      <div style={{display:'flex'}}>

        <ClientList onClientClick={this.setClickedClient} />
        <div className='scrollarea' style={{flexGrow:1}}>
          <Sticky topOffset={-88} stickyClassName='sticks'>
            <Slide direction="up" in={!!this.state.selectedClient} mountOnEnter unmountOnExit>
              <ClientDetail client={this.state.selectedClient} />
            </Slide>
          </Sticky>
        </div>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition)
)(Clients);
