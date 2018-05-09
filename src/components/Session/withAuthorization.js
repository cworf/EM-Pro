import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { firebase } from '../../firebase';

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push('/signin');
        }
      });
    }

    render() {
      return this.props.sessionStore.authUser ? <Component /> : null;
    }
  }

  return compose(
    withRouter,
    inject('dataStore', 'sessionStore'),
    observer
  )(WithAuthorization);
}

export default withAuthorization;
