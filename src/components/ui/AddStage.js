import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import Select from 'material-ui/Select';
import {Collection} from 'firestorter';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    width: 40,
    height: 40
  },
  formControl: {
    marginBottom: theme.spacing.unit,
    minWidth: '100%',
  },
  textField: {
    marginBottom: theme.spacing.unit,
  },
  fcHalf: {
    width: '50%',
  },
  fcThird: {
    width: '33.33%'
  }
});

const powerTemplate = {
  location : '',
  amps : 0,
  volts : 0,
  qty : 0,
  type : '',
  notes : '',
}

class AddStage extends React.Component {
  state = {
    open: false,
    name: '',
    type: '',
    roof_type: '',
    rigging_infrastructure: '',
    electrician_available: false,
    dimensions: {
      depth: '',
      upstage_width: '',
      upstage_height: '',
      downstage_width: '',
      downstage_height: '',
      coverage_area_depth: '',
      coverage_area_width: '',
    },
    power: [
      {
        amps : '',
        volts : '',
        qty : '',
        type : '',
        location : '',
        notes : '',
      }
    ]
  };

  stages = new Collection(`${this.props.venuePath}/stages`)

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleReset = () => {
    this.setState({open: false})
  }

  handleChange = (key) => e => {
    key
    ? this.setState({
      [key] : {
        ...this.state[key],
        [e.target.name] : e.target.value
      }
    })
    : this.setState({ [e.target.name]: e.target.value });
  };

  handlePowerChange = (i) => e => {
    const {power} = this.state
    power[i][e.target.name] = e.target.value
    this.setState({ power })
  };

  handleAddPower = () => {
    this.setState(prevState => ({
      power: [...prevState.power, {
        amps : '',
        volts : '',
        qty : '',
        type : '',
        location : '',
        notes : '',
      }]
    }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.stages.add({...this.state})
    this.handleReset()
  }

  render() {
    const { classes } = this.props
    const { open, name, roof_type, rigging_infrastructure, electrician_available, dimensions, power, type } = this.state
    const { depth, upstage_width, upstage_height, downstage_width, downstage_height, coverage_area_depth, coverage_area_width} = dimensions
    return (
      <div>
        <Button variant="fab" color="secondary" className={classes.fab} aria-label="edit"
          onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          style={{maxWidth: 'initial'}}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Stage</DialogTitle>
          <form className={classes.root} onSubmit={this.handleSubmit} autoComplete="off">
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={name}
                onChange={this.handleChange('')}
                margin="normal"
                name='name'
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="type"
                label="Type"
                className={classes.textField}
                value={type}
                onChange={this.handleChange('')}
                margin="normal"
                helperText='e.g. Indoor Theater'
                name='type'
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="roof_type"
                label="Roof Type"
                className={classes.textField}
                value={roof_type}
                onChange={this.handleChange('')}
                margin="normal"
                name='roof_type'
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="rigging_infrastructure"
                label="Rigging Infrastructure"
                className={classes.textField}
                value={rigging_infrastructure}
                onChange={this.handleChange('')}
                margin="normal"
                helperText='upstage truss, downstage truss, etc etc'
                name='rigging_infrastructure'
              />
            </FormControl>
            <FormGroup row>
              <FormLabel component="legend">Stage Dimensions</FormLabel>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="weight">Depth</InputLabel>
                <Input
                  id="depth"
                  className={classes.textField}
                  value={depth}
                  onChange={this.handleChange('dimensions')}
                  name='depth'
                  type='number'
                  endAdornment={<InputAdornment position="end">ft</InputAdornment>}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="weight">Upstage Width</InputLabel>
                <Input
                  id="upstage_width"
                  className={classes.textField}
                  value={upstage_width}
                  onChange={this.handleChange('dimensions')}
                  name='upstage_width'
                  type='number'
                  endAdornment={<InputAdornment position="end">ft</InputAdornment>}
                />
              </FormControl>
              <FormControl className={classes.fcHalf}>
                <InputLabel htmlFor="downstage_width">DownStage Width</InputLabel>
                <Input
                  id="downstage_width"
                  className={classes.textField}
                  value={downstage_width}
                  onChange={this.handleChange('dimensions')}
                  name='downstage_width'
                  type='number'
                  endAdornment={<InputAdornment position="end">ft</InputAdornment>}
                />
              </FormControl>
              <FormControl className={classes.fcHalf}>
                <InputLabel htmlFor="upstage_height">Upstage Height</InputLabel>
                <Input
                  id="upstage_height"
                  className={classes.textField}
                  value={upstage_height}
                  onChange={this.handleChange('dimensions')}
                  name='upstage_height'
                  type='number'
                  endAdornment={<InputAdornment position="end">ft</InputAdornment>}
                />
              </FormControl>
              <FormControl className={classes.fcHalf}>
                <InputLabel htmlFor="downstage_height">Downstage Height</InputLabel>
                <Input
                  id="downstage_height"
                  className={classes.textField}
                  value={downstage_height}
                  onChange={this.handleChange('dimensions')}
                  name='downstage_height'
                  type='number'
                  endAdornment={<InputAdornment position="end">ft</InputAdornment>}
                />
              </FormControl>
              <FormControl className={classes.fcHalf}>
                <InputLabel htmlFor="coverage_area_width">Coverage Area Width</InputLabel>
                <Input
                  id="coverage_area_width"
                  className={classes.textField}
                  value={coverage_area_width}
                  onChange={this.handleChange('dimensions')}
                  name='coverage_area_width'
                  type='number'
                  endAdornment={<InputAdornment position="end">ft</InputAdornment>}
                />
              </FormControl>
              <FormControl className={classes.fcHalf}>
                <InputLabel htmlFor="coverage_area_depth">Coverage Area Depth</InputLabel>
                <Input
                  id="coverage_area_depth"
                  className={classes.textField}
                  value={coverage_area_depth}
                  onChange={this.handleChange('dimensions')}
                  name='coverage_area_depth'
                  type='number'
                  endAdornment={<InputAdornment position="end">ft</InputAdornment>}
                />
              </FormControl>
            </FormGroup>
            <FormLabel component="legend">Power Availability</FormLabel>
            {power.map((item, i) => {
              const { location, amps, volts, qty, type, notes } = item
              return (
                <FormGroup row key={i}>
                  <FormControl className={classes.fcHalf}>
                    <InputLabel htmlFor="amps">Amps</InputLabel>
                    <Input
                      id="amps"
                      className={classes.textField}
                      value={amps}
                      onChange={this.handlePowerChange(i)}
                      name='amps'
                      type='number'
                      endAdornment={<InputAdornment position="end">A</InputAdornment>}
                    />
                  </FormControl>
                  <FormControl className={classes.fcHalf}>
                    <InputLabel htmlFor="volts">Volts</InputLabel>
                    <Input
                      id="volts"
                      className={classes.textField}
                      value={volts}
                      onChange={this.handlePowerChange(i)}
                      name='volts'
                      type='number'
                      endAdornment={<InputAdornment position="end">V</InputAdornment>}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="qty"
                      label="Qty Available"
                      className={classes.textField}
                      value={qty}
                      onChange={this.handlePowerChange(i)}
                      margin="normal"
                      type="number"
                      name='qty'
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="type"
                      label="Type"
                      className={classes.textField}
                      value={type}
                      onChange={this.handlePowerChange(i)}
                      margin="normal"
                      name='type'
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="location"
                      label="Location"
                      className={classes.textField}
                      value={location}
                      onChange={this.handlePowerChange(i)}
                      margin="normal"
                      name='location'
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id="notes"
                      label="Notes"
                      className={classes.textField}
                      value={notes}
                      onChange={this.handlePowerChange(i)}
                      margin="normal"
                      name='notes'
                    />
                  </FormControl>
                </FormGroup>
              )
            })}
            <Button onClick={this.handleAddPower}>
              Add Power
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type='submit' color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
        </Dialog>
      </div>
    );
  }
}

AddStage.propTypes = {
  classes: PropTypes.object.isRequired,
  venuePath: PropTypes.any
};

export default withStyles(styles)(AddStage)
