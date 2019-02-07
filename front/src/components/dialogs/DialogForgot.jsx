import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';
import PropTypes from 'prop-types';

import './dialog.css';
import { validateEmail } from '../../utils';


export default class DialogForgot extends Component {
  state = {
    email: null,
    emailError: false,
  }

  onSetEmail = (event) => {
    this.setState({ email: event.target.value });
    this.setState({ emailError: !validateEmail(event.target.value) });
  }

  onForgotPassword = () => {
    const { email } = this.state;
    axios.post('/api/user/forgot', {
      email,
    }).then(
      // ...
    ).catch((response) => {
      console.log(response);
    });
  }

  validateEmail = (event) => {
    this.setState({ emailError: !validateEmail(event.target.value) });
  }

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Enter your email to get confirmation code</DialogTitle>
        <DialogContent>
          <form className="dialog-style">
            <TextField
              label="Enter email"
              margin="normal"
              onChange={this.onSetEmail}
              // eslint-disable-next-line react/destructuring-assignment
              error={this.state.emailError}
              onBlur={this.validateEmail}
              // eslint-disable-next-line react/destructuring-assignment
              helperText={this.state.emailError && 'enter a valid email'}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              onClick={this.onForgotPassword}
              // eslint-disable-next-line react/destructuring-assignment
              disabled={!this.state.email || this.state.emailError}
            // eslint-disable-next-line react/jsx-one-expression-per-line
            >
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

DialogForgot.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
