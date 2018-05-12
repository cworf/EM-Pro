import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import withData from '../Session/withData';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { Collection } from 'firestorter';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class DocSelector extends Component {

  whichDocs = () => {
    const {dataStore: {clients, venues}, client, venue} = this.props
    if (client) {
      return clients.docs
    } else if (venue) {
      return venues.docs
    } else {
      return null
    }
  }

  state = {
    selected: '',
    docs: this.whichDocs(),
  }

  stagesCol = this.props.stage ? new Collection(`${this.props.venuePath}/stages`) : null

  handleChange = event => {
    const {venue, stage, client} = this.props
    const name = venue ? 'venue' : stage ? 'stage' : client ? 'client' : ''
    this.setState({
      selected: event.target.value
    })
    this.props.onDocSelect(name, event.target.value)
  }

  render() {
    const { classes, venue, stage, client } = this.props;
    const { docs, selected } = this.state
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="detail-select">Select {venue ? 'Venue' : stage ? 'Stage' : client ? 'Client' : ''}</InputLabel>
          <Select
            value={selected}
            onChange={this.handleChange}
            inputProps={{
              name: 'detail',
              id: 'detail-select',
            }}
          >
            <MenuItem value="">
              <em>None Selected</em>
            </MenuItem>
            {stage ?
              this.stagesCol.docs.map(stage => {
                const { id, data, path } = stage
                const { name } = data
                return <MenuItem key={id} value={path}>{name}</MenuItem>
              })
              :!!docs && docs.map(doc =>{
              const { id, data, path } = doc
              const { name } = data
              return <MenuItem key={id} value={path}>{client ? `${name.first} ${name.last}` : name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
    )
  }
};

DocSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  venue: PropTypes.bool,
  stage: PropTypes.bool,
  client: PropTypes.bool,
  venuePath: PropTypes.string,
  onDocSelect: PropTypes.func.isRequired,
};

// const clientsQuery = (props, collection) => (
//   collection.ref.orderBy('name.last', 'asc')
// )

export default compose(
  withData(['/clients', '/venues']),
  inject('dataStore'),
  withStyles(styles),
  observer
)(DocSelector)
