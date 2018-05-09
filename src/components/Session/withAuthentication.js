import React from 'react';
import { inject } from 'mobx-react';

import { firebase } from '../../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { sessionStore } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          // dataStore.setData(authUser)
          sessionStore.setAuthUser(authUser);
        } else {
          sessionStore.setAuthUser(null);
        }
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  return inject('sessionStore')(WithAuthentication);
}

export default withAuthentication;
