import React from 'react';
import { observer } from 'mobx-react';
import { compose } from 'recompose';


const withDocument = (getPath) => (Component) => {
  class WithDocument extends React.Component {
    state = {
      doc: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const doc = prevState.doc || new Document();
      if (doc.path !== getPath(nextProps)) doc.path = getPath(nextProps);
      return {
        doc
      };
    }

    render() {
      // const {snapshot} = this.state.doc
      // if (!snapshot) return null
      return <Component {...this.state} />
    }
  }

  return compose(
    observer
  )(WithDocument);
}

export default withDocument;
