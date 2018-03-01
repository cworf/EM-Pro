import React from 'react';

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

        {this.state.selectedClient ? <ClientDetail client={this.state.selectedClient} /> : 'no client selected'}

      </div>
    );
  }
}

export default Clients;
