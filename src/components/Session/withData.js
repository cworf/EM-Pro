import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { db } from '../../firebase';

const withData = function() {
  const storeAs = []
  const requests = []
  for (let i = 0; i < arguments.length; i++) {
    const regex = /[^/]+$/gm; // match string after the last forward slash
    storeAs[i] = arguments[i] === '/' ? 'company' : arguments[i].match(regex)[0]
    requests[i] = arguments[i]
  }
  return function(Component) {
    class WithData extends React.Component {
      componentDidMount() {

        const { userStore, sessionStore: {authUser}, dataStore } = this.props;
        if (authUser) {
          db.getUser(authUser) // get user info from firestore
            .then(userDoc => {
              const {company} = userDoc.data() // get company ID user is attributed to
              return Promise.all([userDoc, db.getData(company, requests)]) //get company document containing all subcollections
            })
            .then(results => {
              const userData = results[0].data()
              const requestedData = results[1] //array of all promised firestore CollectionQueries
              userStore.setUser(userData)
              dataStore.setData(storeAs, requestedData)
            })
        }
      }

      render() {
        const {dataStore : {companyData}} = this.props
        return hasData(companyData) ? <Component /> : null;
      }
    }

    const hasData = companyData => {
      let go = true
      storeAs.forEach(key => {
        if (!companyData.has(key)) go = false
      })
      return go
    }

    return compose(
      inject('sessionStore', 'userStore', 'dataStore'),
      observer
    )(WithData);
  }
}

export default withData;
