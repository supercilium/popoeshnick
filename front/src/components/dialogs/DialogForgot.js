import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import axios from 'axios'
import PropTypes from 'prop-types'

import './dialog.css'
import { validateEmail, validatePass } from '../../utils'


export class DialogForgot extends Component {
  state = {
    login: null,
    password: null,
    passwordIdentity: false,
  }

  onSetLogin = (event) => {
    this.setState({login: event.target.value})
  }

  onForgotPassword = () => {
    axios.post('/api/user/forgot', {
      email: this.state.login,
      password: this.state.password
    }).then(
      // ...
    )
  }

  validateEmail = (event) => {
    this.setState({ emailError: !validateEmail(event.target.value) })
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle>{'Enter your email to get confirmation code'}</DialogTitle>
        <DialogContent>
          <form className="dialog-style">
            <TextField
              label="Enter email"
              margin="normal"
              onChange={this.onSetLogin}
              error={this.state.emailError}
              onBlur={this.validateEmail}
              helperText={this.state.emailError && "enter a valid email"}
            />
            <Button
              variant="contained"
              color="primary"
              style={{marginTop: '20px'}}
              onClick={this.onForgotPassword}
              disabled={!this.state.login}
            >
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
}

PropTypes.DialogSignup = {
  open: PropTypes.boolean,
  onClose: () => {},
}