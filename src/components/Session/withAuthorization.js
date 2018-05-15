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
        } else {
          this.props.userStore.setUser(`users/${authUser.uid}`)
        }
      });
    }


    render() {
      const {sessionStore: {authUser}, userStore: {user}, ...other} = this.props
      return authUser && user.data
        ? <Component {...other} />
        : null;
    }
  }

  return compose(
    withRouter,
    inject('sessionStore', 'userStore'),
    observer
  )(WithAuthorization);
}

export default withAuthorization;
