import React, { Component } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { API_CONST } from '../../constants';

import './dialog.css';
import { validateEmail, validatePass, instance } from '../../utils';

export default class DialogSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null,
      passwordIdentity: null,
      emailError: false,
      passError: false,
      loading: false,
      error: "Wait, i'm load",
    };
  }

  onSetPassword = (event) => {
    this.setState({ password: event.target.value, passError: !validatePass(event.target.value) });
  }

  onSetLogin = (event) => {
    this.setState({ login: event.target.value, emailError: !validateEmail(event.target.value) });
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
    const { password, login } = this.state;
    this.setState({ loading: true });
    instance.post(API_CONST.REGISTER, {
      password,
      email: login,
    }).then((response) => {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onSend();
    }).catch(async (error) => {
      if (error.response) {
        this.setState({ error: error.response.data });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        this.setState({ error: error.request });
      } else {
        // Something happened in setting up the request that triggered an Error
        this.setState({ error: error.message });
      }
    });
  }

  render() {
    const { open, onClose } = this.props;
    const {
      loading,
      error,
      login,
      password,
      passwordIdentity,
      passError,
      emailError,
    } = this.state;
    return (
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          {
            loading
              ? <div>{error}</div>
              : (
                <form className="dialog-style">
                  <TextField
                    label="Enter email"
                    margin="normal"
                    onChange={this.onSetLogin}
                    error={emailError}
                    onBlur={this.validateEmail}
                    helperText={emailError && 'enter a valid email'}
                  />
                  <TextField
                    label="Enter password"
                    margin="normal"
                    type="password"
                    onChange={this.onSetPassword}
                    error={passError}
                    onBlur={this.validatePass}
                    helperText={passError && 'must contain at list 8 charecters'}
                  />
                  <TextField
                    label="Verify password"
                    margin="normal"
                    type="password"
                    onChange={this.handleVerifyPassword}
                    error={password && !passwordIdentity}
                    helperText={password && !passwordIdentity && 'does not match'}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    onClick={this.onSignup}
                    disabled={!login || !password || !passwordIdentity || (passError || emailError)}
                  // eslint-disable-next-line react/jsx-one-expression-per-line
                  >
                    Sign Up
                  </Button>
                </form>
              )
          }
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
