import React from 'react';
import Slide from 'material-ui/transitions/Slide';
import Fade from 'material-ui/transitions/Fade';
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

  // getClass = client => () => {
  //   return this.state.selectedClient === client
  //     ? 'selected'
  //     : ''
  // }

  render() {
    return (
      <div style={{display:'flex'}}>

        <ClientList onClientClick={this.setClickedClient} />
        <div className='scrollarea' style={{flexGrow:1}}>
          <Sticky topOffset={-88} stickyClassName='sticks'>
            <Slide direction="up" in={this.state.selectedClient ? true : false} mountOnEnter unmountOnExit>
              <ClientDetail client={this.state.selectedClient} />
            </Slide>
          </Sticky>
        </div>
      </div>
    );
  }
}

export default Clients;
