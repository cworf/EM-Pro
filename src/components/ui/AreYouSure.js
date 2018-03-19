import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';


const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  red: {
    color: red[500],
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: red[500],
    opacity: 0,
    transition: '.2s ease'
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class AreYouSure extends Component {

  state = {
    open: false,
    anchorEl: null,
    anchorOriginVertical: 'center',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'center',
    transformOriginHorizontal: 'center',
    anchorReference: 'anchorEl',
  };

  handleClickButton = () => {
    this.setState({
      open: true,
      anchorEl: findDOMNode(this.button),
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  button = null;

  render(){
    const { classes, onAccept, children, styles, question, acceptBtn, cancelBtn } = this.props;
    const {
      open,
      anchorEl,
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
      anchorReference,
    } = this.state;
    return (
      <div style={styles} className='hover-show'>

        <IconButton
          ref={node => {
            this.button = node;
          }}
          color='inherit'
          className={classes.red}
          aria-label="Delete"
          onClick={this.handleClickButton}
        >
          {children}
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          anchorReference={anchorReference}
          anchorPosition={{ top: 200, left: 400 }}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: anchorOriginVertical,
            horizontal: anchorOriginHorizontal,
          }}
          transformOrigin={{
            vertical: transformOriginVertical,
            horizontal: transformOriginHorizontal,
          }}
        >
          <Typography className={classes.typography}>{question ? question : 'Are you sure?'}</Typography>
          <Button variant="raised" color="secondary" className={classes.button}>
            {cancelBtn ? cancelBtn : 'No'}
          </Button>
          <Button variant="raised" style={{backgroundColor: red[500]}} className={classes.button}>
            {acceptBtn ? acceptBtn : 'Yes'}
          </Button>
        </Popover>
      </div>
    );
  }
}

AreYouSure.propTypes = {
  classes: PropTypes.object.isRequired,
  onAccept: PropTypes.func,
  right: PropTypes.bool,
  question: PropTypes.string,
  acceptBtn: PropTypes.string,
  cancelBtn: PropTypes.string,
}

export default withStyles(styles)(AreYouSure);
