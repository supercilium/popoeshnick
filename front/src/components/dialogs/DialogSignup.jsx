import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';
import PropTypes from 'prop-types';

import './dialog.css';
import { validateEmail, validatePass } from '../../utils';

export default class DialogSignup extends Component {
  state = {
    login: null,
    password: null,
    passwordIdentity: null,
    emailError: false,
    passError: false,
  }

  onSetPassword = (event) => {
    this.setState({ password: event.target.value });
    this.setState({ passError: !validatePass(event.target.value) });
  }

  onSetLogin = (event) => {
    this.setState({ login: event.target.value });
    this.setState({ emailError: !validateEmail(event.target.value) });
  }

  validateEmail = (event) => {
    this.setState({ emailError: !validateEmail(event.target.value) });
  }

  validatePass = (event) => {
    this.setState({ passError: !validatePass(event.target.value) });
  }

  handleVerifyPassword = (event) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (event.target.value === this.state.password) {
      this.setState({ passwordIdentity: true });
    }
  }

  onSignup = () => {
    axios.post('/api/user/registration', {
      // eslint-disable-next-line react/destructuring-assignment
      email: this.state.login,
      password: this.state,
    }).then(
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onSend(),
    );
  }

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          <form className="dialog-style">
            <TextField
              label="Enter email"
              margin="normal"
              onChange={this.onSetLogin}
              // eslint-disable-next-line react/destructuring-assignment
              error={this.state.emailError}
              onBlur={this.validateEmail}
              // eslint-disable-next-line react/destructuring-assignment
              helperText={this.state.emailError && 'enter a valid email'}
            />
            <TextField
              label="Enter password"
              margin="normal"
              type="password"
              onChange={this.onSetPassword}
              // eslint-disable-next-line react/destructuring-assignment
              error={this.state.passError}
              onBlur={this.validatePass}
              // eslint-disable-next-line react/destructuring-assignment
              helperText={this.state.passError && 'must contain at list 8 charecters'}
            />
            <TextField
              label="Verify password"
              margin="normal"
              type="password"
              onChange={this.handleVerifyPassword}
              // eslint-disable-next-line react/destructuring-assignment
              error={this.state.password && !this.state.passwordIdentity}
              // eslint-disable-next-line react/destructuring-assignment
              helperText={this.state.password && !this.state.passwordIdentity && 'does not match'}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              onClick={this.onSignup}
              // eslint-disable-next-line react/destructuring-assignment
              disabled={!this.state.login || !this.state.password || !this.state.passwordIdentity
              // eslint-disable-next-line react/destructuring-assignment
              || (this.state.passError || this.state.emailError)}
            // eslint-disable-next-line react/jsx-one-expression-per-line
            >
              Sign Up
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

DialogSignup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};
