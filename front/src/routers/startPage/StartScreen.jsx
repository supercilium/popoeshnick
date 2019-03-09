/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  Button,
} from '@material-ui/core';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { API_CONST } from '../../constants';

import './StartScreen.css';
import {
  LoginForm,
  DialogSignup,
  DialogForgot,
  Loader,
  Home,
  Container,
} from '../../components';

const cookies = new Cookies();
export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSignup: false,
      openForgot: false,
      loader: true,
      auth: null,
      profile: {},
    };
  }

  componentDidMount() {
    this.setState({ loader: true });
    const cookie = cookies.get('session');
    if (cookie) {
      axios.get(API_CONST.PROFILE).then((res) => {
        const { errors, profile, status } = res.data;
        if (status === 'success') {
          this.setState({ profile, auth: true });
        } else {
          console.log(errors);
        }
      }).catch((error) => {
        console.log(error);
      }).then(() => this.setState({ loader: false }));
    } else {
      this.setState({ loader: false, auth: false });
    }
  }

  handleLogin = profile => this.setState({ profile, auth: true });

  handleLogout = () => {
    axios.get(API_CONST.LOGOUT).then(() => {
      this.setState({
        openSignup: false,
        openForgot: false,
        loader: true,
        profile: {},
        auth: false,
      });
    }).then(() => {
      this.setState({
        loader: false,
      });
    });
  }

  handleSendQuery = profile => this.setState({ profile })

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
    const {
      loader,
      profile,
      auth,
    } = this.state;
    return (
      <Container
        auth={auth}
        handleLogout={this.handleLogout}
      >
        {loader && <Loader />}
        {auth
          ? <Home {...profile} />
          : (
            <header className="App-header">
              <LoginForm
                onLogin={this.handleLogin}
              />
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
          )
        }
      </Container>
    );
  }
}
