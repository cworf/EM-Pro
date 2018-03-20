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
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import {inventoryCategories} from '../../assets/data/taxonomies';
import {inventory} from '../appStore'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  formControl: {
    marginBottom: theme.spacing.unit,
    minWidth: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'auto',
  },
  fcHalf: {
    minWidth: '50%',
  },
  fcThird: {
    width: '33.33%'
  }
});

class AddInventory extends React.Component {
  state = {
    open: false,
    category: '',
    type: '',
    model: '',
    series: '',
    manufacturer: '',
    name: '',
    inventoryCount: 0,
    in_stock: 0,
    weight: 0,

  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleReset = () => {
    this.setState({open: false, category: '', type: '', model: '', series: '', manufacturer: '', name: '', inventoryCount: 0, in_stock: 0, weight: 0, })
  }

  handleChange = event => {
    event.target.name === 'inventory'
    ?this.setState({inventory: event.target.value, in_stock: event.target.value})
    :this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault()
    let {open, inventoryCount, in_stock, weight, ...data} = this.state
    inventoryCount = parseInt(inventoryCount, 10)
    in_stock = parseInt(in_stock, 10)
    weight = parseInt(weight, 10)
    inventory.add({...data, weight, in_stock, inventoryCount})
    this.handleReset()
  }

  render() {
    const { classes } = this.props
    const { open, category, type, model, series, manufacturer, name, inventoryCount, weight } = this.state
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
          <DialogTitle id="form-dialog-title">Create Inventory Item</DialogTitle>
          <form className={classes.root} onSubmit={this.handleSubmit} autoComplete="off">
          <DialogContent>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Category</InputLabel>
              <Select
                value={category}
                onChange={this.handleChange}
                inputProps={{
                  name: 'category',
                  id: 'cat-picker',
                }}
              >
                <MenuItem value="">
                  <em>Pick a category</em>
                </MenuItem>
                {
                  Object.keys(inventoryCategories).map((cat, i) =>
                    <MenuItem key={i} value={cat}>{cat}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Type</InputLabel>
              <Select
                disabled={category ? false : true}
                value={this.state.type}
                onChange={this.handleChange}
                inputProps={{
                  name: 'type',
                  id: 'type-picker',
                }}
              >
                <MenuItem value="">
                  <em>Pick a {category} type</em>
                </MenuItem>
                {
                  Object.keys(inventoryCategories).map((cat, i) =>
                    cat === category
                    ? inventoryCategories[cat].map((catType, n) =>
                      <MenuItem key={n} value={catType}>{catType}</MenuItem>
                    )
                    :null
                  )
                }
              </Select>
            </FormControl>
            <FormControl className={classes.fcThird}>
              <TextField
                disabled={type?false:true}
                id="model"
                label="Model"
                className={classes.textField}
                value={model}
                onChange={this.handleChange}
                margin="normal"
                name='model'
              />
            </FormControl>
            <FormControl className={classes.fcThird}>
              <TextField
                disabled={type?false:true}
                id="series"
                label="Series"
                className={classes.textField}
                value={series}
                onChange={this.handleChange}
                margin="normal"
                name='series'
              />
            </FormControl>
            <FormControl className={classes.fcThird}>
              <TextField
                disabled={type?false:true}
                id="manufacturer"
                label="Manufacturer"
                className={classes.textField}
                value={manufacturer}
                onChange={this.handleChange}
                margin="normal"
                name='manufacturer'
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                disabled={type?false:true}
                id="name"
                label="Full Product Name"
                className={classes.textField}
                value={name}
                onChange={this.handleChange}
                margin="normal"
                name='name'
              />
            </FormControl>
            <FormControl className={classes.fcHalf}>
              <TextField
                disabled={type?false:true}
                id="inventory"
                label="Inventory"
                className={classes.textField}
                value={inventoryCount}
                onChange={this.handleChange}
                margin="normal"
                name='inventoryCount'
                type='number'
              />
            </FormControl>
            <FormControl className={classes.fcHalf}>
              <InputLabel htmlFor="weight">Unit Weight</InputLabel>
              <Input
                disabled={type?false:true}
                id="weight"
                className={classes.textField}
                value={weight}
                onChange={this.handleChange}
                name='weight'
                type='number'
                endAdornment={<InputAdornment position="end">Lbs</InputAdornment>}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type='submit' color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
        </Dialog>
      </div>
    );
  }
}

AddInventory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddInventory)
