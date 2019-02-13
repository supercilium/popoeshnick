/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import {
  Redirect,
} from 'react-router-dom';

import './StartScreen.css';
import { DialogSignup, DialogForgot } from '../../components/dialogs';
import { validateEmail, validatePass } from '../../utils';

export default class StartScreen extends Component {
  state = {
    login: null,
    password: null,
    openSignup: false,
    openForgot: false,
    redirect: null,
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
    // console.log()
  }

  validatePass = (event) => {
    this.setState({ passError: !validatePass(event.target.value) });
  }

  onLogin = () => {
    const { login, password } = this.state;
    axios.post('/api/user/login/', {
      password,
      email: login,
    }).then(
      // ...
      this.setState({ redirect: true }),
    );
  }

  handleSendQuery = () => this.setState({ redirect: true })

  handleCloseSignup = () => {
    this.setState({ openSignup: false });
  }

  handleOpenSignup = () => {
    this.setState({ openSignup: true });
  }

  handleCloseForgot = () => {
    this.setState({ openForgot: false });
  }

  handleOpenForgot = () => {
    this.setState({ openForgot: true });
  }


  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/protected" />;
    }
    return (
      <div className="start">
        <header className="App-header">
          <div id="alkashPicture" />
          <Typography component="h1" variant="h4" style={{ marginTop: '20px' }}>
            Hello, Alkash!!!
          </Typography>
          <Typography component="h2" variant="subtitle1" style={{ marginTop: '10px' }}>
            Explore alco-possibilities with new awesome service Popoeshnick
          </Typography>
          <TextField
            required
            label="email"
            margin="normal"
            type="email"
            onChange={this.onSetLogin}
            onBlur={this.validateEmail}
            // eslint-disable-next-line react/destructuring-assignment
            error={this.state.emailError}
            // eslint-disable-next-line react/destructuring-assignment
            helperText={this.state.emailError && 'enter a valid email'}
          />
          <TextField
            required
            label="password"
            margin="normal"
            type="password"
            onChange={this.onSetPassword}
            onBlur={this.validatePass}
            // eslint-disable-next-line react/destructuring-assignment
            error={this.state.passError}
            // eslint-disable-next-line react/destructuring-assignment
            helperText={this.state.passError && 'must contain at list 8 charecters'}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
            onClick={this.onLogin}
            // eslint-disable-next-line react/destructuring-assignment
            disabled={!this.state.login || !this.state.password
            // eslint-disable-next-line react/destructuring-assignment
            || (this.state.passError || this.state.emailError)}
          >
            Log in
          </Button>
          <Button
            style={{ marginTop: '15px', marginBottom: '15px' }}
            onClick={this.handleOpenForgot}
          >
            Forgot password?
          </Button>
          <Button
            onClick={this.handleOpenSignup}
          >
            Registration
          </Button>
          <DialogSignup
            // eslint-disable-next-line react/destructuring-assignment
            open={this.state.openSignup}
            onClose={this.handleCloseSignup}
            onSend={this.handleSendQuery}
          />
          <DialogForgot
            // eslint-disable-next-line react/destructuring-assignment
            open={this.state.openForgot}
            onClose={this.handleCloseForgot}
          />
        </header>
      </div>
    );
  }
}
