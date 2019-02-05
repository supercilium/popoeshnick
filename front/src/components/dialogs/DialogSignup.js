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

export class DialogSignup extends Component {
  state = {
    login: null,
    password: null,
    passwordIdentity: null,
    emailError: false,
    passError: false,
  }

  onSetPassword = (event) => {
    this.setState({ password: event.target.value })
    this.setState({ passError: !validatePass(event.target.value) })
  }

  onSetLogin = (event) => {
    this.setState({login: event.target.value})
    this.setState({ emailError: !validateEmail(event.target.value) })
  }

  validateEmail = (event) => {
    this.setState({ emailError: !validateEmail(event.target.value) })
  }

  validatePass = (event) => {
    this.setState({ passError: !validatePass(event.target.value) })
  }

  handleVerifyPassword = (event) => {
    if (event.target.value === this.state.password) {
      this.setState({ passwordIdentity: true })
    }
  }
  
  onSignup = () => {
    axios.post('/api/user/registration', {
      email: this.state.login,
      password: this.state.password
    }).then(
      this.props.onSend()
    )
  }
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle>{'Registration'}</DialogTitle>
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
            <TextField
              label="Enter password"
              margin="normal"
              type="password"
              onChange={this.onSetPassword}
              error={this.state.passError}
              onBlur={this.validatePass}
              helperText={this.state.passError && "must contain at list 8 charecters"}
            />
            <TextField
              label="Verify password"
              margin="normal"
              type="password"
              onChange={this.handleVerifyPassword}
              error={this.state.password && !this.state.passwordIdentity}
              helperText={this.state.password && !this.state.passwordIdentity && "does not match"}
            />
            <Button
              variant="contained"
              color="primary"
              style={{marginTop: '20px'}}
              onClick={this.onSignup}
              disabled={!this.state.login || !this.state.password || !this.state.passwordIdentity || (this.state.passError || this.state.emailError)}
            >
              Sign Up
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
  onSend: () => {},
}