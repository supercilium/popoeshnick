import React, { Component } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';

import './dialog.css';
import { validateEmail } from '../../utils';


export default class DialogForgot extends Component {
  state = {
    email: null,
    emailError: false,
    infoSent: false,
    response: '',
  }

  onSetEmail = (event) => {
    this.setState({ email: event.target.value });
    this.setState({ emailError: !validateEmail(event.target.value) });
  }

  onForgotPassword = () => {
    const { email } = this.state;
    axios.post('/api/user/forgot', {
      email,
    }).then((response) => {
      if (response) {
        this.setState({ infoSent: true, response: 'Please check your email for further instructions' });
      }
    }).catch((response) => {
      this.setState({ infoSent: true, response: `Sorry, something gone wrong... ${response}` });
    });
  }

  validateEmail = (event) => {
    this.setState({ emailError: !validateEmail(event.target.value) });
  }

  onSubmit = (e) => {
    const { email } = this.state;
    e.preventDefault();
    if (validateEmail(email)) {
      this.onForgotPassword();
    }
  }

  render() {
    const { open, onClose } = this.props;
    const { infoSent, response } = this.state;
    if (infoSent) {
      return (
        <Dialog
          open={open}
          onClose={onClose}
        >
          <DialogTitle>{response}</DialogTitle>
          <DialogContent>
            <div className="dialog-style">

              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={onClose}
                // eslint-disable-next-line react/jsx-one-expression-per-line
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Enter your email to get confirmation code</DialogTitle>
        <DialogContent>
          <form
            onSubmit={this.onSubmit}
            className="dialog-style"
          >
            <TextField
              required
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
