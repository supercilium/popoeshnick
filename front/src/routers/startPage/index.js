import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

import './StartScreen.css'

const DIALOG_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  alignIitems: 'center',
  justifyContent: 'center',
}

export default class StartScreen extends Component {
  state = {
    login: null,
    password: null,
    dialogOpen: false,
    dialogOpenForgot: false,
    passwordIdentity: false,
  }

  onSetPassword = (event) => {
    this.setState({password: event.target.value})
  }

  onSetLogin = (event) => {
    this.setState({login: event.target.value})
  }

  onLogin = () => {
    axios.post('/user/login', {
      email: this.state.login,
      password: this.state.password
    }).then(
      // ...
    )
  }

  onSignup = () => {
    axios.post('/user/signup', {
      email: this.state.login,
      password: this.state.password
    }).then(
      // ...
    )
  }

  onForgotPassword = () => {
    axios.post('/user/forget', {
      email: this.state.login,
    }).then(
      // ...
    )
  }

  onCloseDialog = () => {
    this.setState({ dialogOpen: false })
  }

  onCloseDialogForgot = () => {
    this.setState({ dialogOpenForgot: false })
  }

  onOpenDialog = () => {
    this.setState({ dialogOpen: true })
  }
  
  onOpenDialogForgot = () => {
    this.setState({ dialogOpenForgot: true })
  }

  handleVerifyPassword = (event) => {
    if (event.target.value === this.state.password) {
      this.setState({ passwordIdentity: true })
    }
  }

  render() {
    return (
      <div className="start">
        <header className="App-header">
          <div id="alkashPicture"></div>
          <Typography component="h1" variant="h4" style={{ marginTop: '20px'}}>
            Hello, Alkash!!!
          </Typography>
          <Typography component="h2" variant="subtitle1">
            Explore alco-possibilities with new awesome service Popoeshnick
          </Typography>
          <TextField
            required
            label="email"
            margin="normal"
            onChange={this.onSetLogin}
          />
          <TextField
            required
            label="password"
            margin="normal"
            type="password"
            onChange={this.onSetPassword}
          />
          <Button
            variant="contained"
            color="primary"
            style={{marginTop: '10px'}}
            onClick={this.onLogin}
          >
            Log in
          </Button>
          <Button
            style={{marginTop: '15px', marginBottom: '15px'}}
            onClick={this.onOpenDialogForgot}
          >
            Forgot password?
          </Button>
          <Button
            onClick={this.onOpenDialog}
          >
            Registration
          </Button>
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.onCloseDialog}
          >
            <DialogTitle id="alert-dialog-title">{'Registration'}</DialogTitle>
            <DialogContent>
              <form
                style={ DIALOG_STYLE }
              >
                <TextField
                  label="Enter email"
                  margin="normal"
                  onChange={this.onSetLogin}
                />
                <TextField
                  label="Enter password"
                  margin="normal"
                  type="password"
                  onChange={this.onSetPassword}
                />
                <TextField
                  label="Repeat password"
                  margin="normal"
                  type="password"
                  onChange={this.handleVerifyPassword}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{marginTop: '20px'}}
                  onClick={this.onLogin}
                  disabled={!this.state.login || !this.state.password || !this.state.passwordIdentity}
                >
                  Sign Up
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.dialogOpenForgot}
            onClose={this.onCloseDialogForgot}
          >
            <DialogTitle>{'Enter your email to get confirmation code'}</DialogTitle>
            <DialogContent>
              <form
                style={ DIALOG_STYLE }
              >
                <TextField
                  label="Enter email"
                  margin="normal"
                  onChange={this.onSetLogin}
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
        </header>
      </div>
    );
  }

}