import React from 'react';
import Slide from 'material-ui/transitions/Slide';
import Fade from 'material-ui/transitions/Fade';

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
        <Slide direction="up" in={this.state.selectedClient} mountOnEnter unmountOnExit>
          <Fade in={this.state.selectedClient}>
            <ClientDetail client={this.state.selectedClient} />
          </Fade>
        </Slide>
      </div>
    );
  }
}

export default Clients;
