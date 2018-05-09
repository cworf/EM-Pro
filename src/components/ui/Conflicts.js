import React from 'react';
import withAuthorization from '../Session/withAuthorization';
import withData from '../Session/withData';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ErrorIcon from 'material-ui-icons/Error';
import Badge from 'material-ui/Badge';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import moment from 'moment';

import AffectedEvents from './AffectedEvents'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  paper:{
    maxWidth: 'initial'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Conflicts extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  formatDate = (date) => moment(date).format('l')

  render() {
    const {classes, dataStore:{companyData}} = this.props
    const conflicts = companyData.get('conflicts')
    const {length} = conflicts.docs
    console.log('length', length);
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>
            <ErrorIcon color="primary" />
          </ListItemIcon>
          <Badge color={length ? "error" : 'secondary'} badgeContent={length} style={{padding: '0 16px'}}>
            <ListItemText primary="Conflicts" />
          </Badge>
        </ListItem>
        <Dialog
          open={this.state.open}
          transition={Transition}
          keepMounted
          classes={{paper: classes.paper}}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {length
              ? `There ${length === 1 ? 'is' : 'are'} ${length} conflict${length > 1 ? 's' : ''} to be resolved`
              : `Contratulations, you dont suck!`}
          </DialogTitle>
          <DialogContent>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell numeric>Qty Ordered</TableCell>
                  <TableCell numeric>Qty Available</TableCell>
                  <TableCell>Between</TableCell>
                  <TableCell>Affected Events</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {conflicts.docs.map((conflict) => {
                  const {item_name, qty_request, total_stock, from, to, affected} = conflict.data()
                  console.log(from, "=>", to);
                  return (
                    <TableRow key={conflict.id}>
                      <TableCell>{item_name}</TableCell>
                      <TableCell numeric>{qty_request}</TableCell>
                      <TableCell numeric>{total_stock}</TableCell>
                      <TableCell>{`${this.formatDate(from)} - ${this.formatDate(to)}`}</TableCell>
                      <TableCell><AffectedEvents eventRefs={affected}/></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  withData('conflicts'),
  inject('dataStore'),
  withStyles(styles)
)(Conflicts);
