import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import axios from 'axios'

const DIALOG_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  alignIitems: 'center',
  justifyContent: 'center',
}
class App extends Component {
  
  state = {
    login: null,
    password: null,
    dialogOpen: false,
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

  onCloseDialog = () => {
    this.setState({ dialogOpen: false })
  }

  onOpenDialog = () => {
    this.setState({ dialogOpen: true })
  }

  handleVerifyPassword = (event) => {
    if (event.target.value === this.state.password) {
      this.setState({ passwordIdentity: true })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="alkashPicture"></div>
          <p>
            Hello, Alkash!!
          </p>
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
            href="#text-buttons"
            style={{marginTop: '15px', marginBottom: '15px'}}
            onClick={this.onOpenDialog}
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
        </header>
      </div>
    );
  }
}

export default App;
