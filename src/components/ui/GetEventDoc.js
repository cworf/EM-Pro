import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Document } from 'firestorter';
import {observer} from 'mobx-react';
import { ListItem, ListItemText } from 'material-ui/List';


const GetEventDoc = observer(class GetEventDoc extends Component {

  eventDoc = new Document(this.props.eventRef)

  // componentWillReceiveProps(newProps) {
  //   if (newProps.eventRef !== this.props.eventRef) {
  //     this.eventDoc.path = newProps.eventDoc;
  //   }
  // }

  render(){
    if (!this.eventDoc.data) return null
    return (
      <div>
        <ListItem button onClick={this.props.onListItemClick.bind(null,this.eventDoc)}>
          <ListItemText primary={this.eventDoc.data.title} />
        </ListItem>
      </div>
    );
  }
})

GetEventDoc.propTypes = {
  eventRef: PropTypes.any.isRequired,
  onListItemClick:  PropTypes.func,
}

export default GetEventDoc;
