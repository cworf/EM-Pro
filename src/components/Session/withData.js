import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

/* ---------example compose with query---------- /*
const eventsQuery = (props, collection) => (
  collection.ref.where('title', '==', 'asdfherh')
)

export default compose(
  withAuthorization(authCondition),
  withData(['/events'], [eventsQuery]),
  inject('userStore', 'dataStore', 'sessionStore'),
  withStyles(styles),
  observer
)(Calendar);
*/

const withData = (requests, queries) => (Component) => {
  class WithData extends React.Component {
    componentDidMount() {
      const {
        sessionStore: {authUser},
        dataStore: {setDataMap, setData, setQuery},
        userStore: {user}
      } = this.props
      !!authUser && user.ready()
        .then(() => {
          const getQuery = (query) => (collection) => query(this.props, collection)
          if (typeof requests === 'function') {
            const dynamicRequests = requests(this.props, user.data.company)
            for (var i = 0; i < dynamicRequests.length; i++) {
              setDataMap(dynamicRequests[i])
            }
          } else {
            for (var i = 0; i < requests.length; i++) {
              const parsed = requests[i].slice(1)
              const storeAs = parsed === 'events' ? 'eventsCol' : parsed || 'company'
              const path = `companies/${user.data.company}${requests[i]}`
              setData(storeAs, path)
              !!(queries && queries[i]) && setQuery(storeAs, getQuery(queries[i]))
            }
          }

        })
    }

    render() {
      const { dataStore, userStore, ...rest} = this.props
      // return this.props.sessionStore.authUser ? <Component /> : null;
      return <Component {...rest} />
    }
  }

  return compose(
    withRouter,
    inject('userStore', 'dataStore', 'sessionStore'),
    observer
  )(WithData);
}

export default withData;
