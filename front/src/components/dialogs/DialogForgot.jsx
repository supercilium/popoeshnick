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
import { API_CONST } from '../../constants';

export default class DialogForgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      emailError: false,
      infoSent: false,
      titleText: '',
    };
  }

  onSetEmail = (event) => {
    this.setState({ email: event.target.value });
    this.setState({ emailError: !validateEmail(event.target.value) });
  }

  handlePasswordRecovery = () => {
    const { email } = this.state;
    axios.post(API_CONST.PASSWORD, {
      email,
    }).then((response) => {
      if (response) {
        this.setState({ infoSent: true, titleText: 'Please check your email for further instructions' });
      }
    }).catch((response) => {
      this.setState({ infoSent: true, titleText: `Sorry, something gone wrong... ${response}` });
    });
  }

  validateEmail = (event) => {
    this.setState({ emailError: !validateEmail(event.target.value) });
  }

  onSubmit = (e) => {
    const { email } = this.state;
    e.preventDefault();
    if (validateEmail(email)) {
      this.handlePasswordRecovery();
    }
  }

  onClose = () => {
    const { onClose } = this.props;
    // TODO remove blinking
    onClose();
    this.setState({ infoSent: false, email: null, emailError: false });
  }

  render() {
    const { open } = this.props;
    const { infoSent, titleText } = this.state;
    if (infoSent) {
      return (
        <Dialog
          open={open}
          onClose={this.onClose}
        >
          <DialogTitle>{titleText}</DialogTitle>
          <DialogContent>
            <div className="dialog-style">

              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={this.onClose}
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
        onClose={this.onClose}
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
              onClick={this.handlePasswordRecovery}
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
