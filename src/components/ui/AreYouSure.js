import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';


const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  red: {
    color: red[500],
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class AreYouSure extends Component {

  state = {
    open: false,
    anchorEl: null,
    anchorReference: 'anchorEl',
    checked: false,
  };

  handleClickButton = () => {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    });
  };

  handleAccept = () => {
    this.handleClose()
    this.props.onAccept()
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = event => {
    this.setState({ checked: event.target.checked });
  };


  button = null;

  render(){
    const { classes, children, styles, question, acceptBtn, cancelBtn, doubleCheck } = this.props;
    const { open, anchorEl, anchorReference, checked } = this.state;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onClick : this.handleClickButton, ref : (node) => {
        this.button = node
      } }));
    return (
      <div style={styles} className='hover-show'>

        {/* <IconButton
          ref={node => {
            this.button = node;
          }}
          color='inherit'
          className={classes.red}
          aria-label="Delete"
          onClick={this.handleClickButton}
        > */}
          {childrenWithProps}
        {/* </IconButton> */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: 200, left: 400 }}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <Typography align="center" className={classes.typography}>
            {question ? question : 'Are you sure?'}
          </Typography>
          { doubleCheck ?
            <Typography variant="body2" align='center' gutterBottom>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={this.handleChange}
                    value="checked"
                    color="primary"
                  />
                }
                label='I accept responsibility for any fuckery...'
              />
            </Typography>
           : null }
           <Typography variant="body2" align='right'>
             <Button variant="raised" color="secondary" className={classes.button} onClick={this.handleClose}>
               {cancelBtn ? cancelBtn : 'No'}
             </Button>
             <Button variant="raised" disabled={doubleCheck ? checked ? false : true : false}
               style={{backgroundColor: red[500]}}
               className={classes.button}
               onClick={this.handleAccept}
              >
               {acceptBtn ? acceptBtn : 'Yes'}
             </Button>
          </Typography>
        </Popover>
      </div>
    );
  }
}

AreYouSure.propTypes = {
  classes: PropTypes.object.isRequired,
  onAccept: PropTypes.func,
  doubleCheck: PropTypes.bool,
  question: PropTypes.string,
  acceptBtn: PropTypes.string,
  cancelBtn: PropTypes.string,
}

export default withStyles(styles)(AreYouSure);
