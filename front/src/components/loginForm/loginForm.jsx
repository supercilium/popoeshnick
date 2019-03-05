/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';

import Image from './alkashs.png';
import { validateEmail, validatePass } from '../../utils';
import { API_CONST } from '../../constants';

const FORM = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

const TITLE = {
  marginTop: '20px',
};

const SUBTITLE = {
  marginTop: '10px',
};

const IMG = {
  flex: '1',
  backgroundImage: `url(${Image})`,
  width: '260px',
  height: '193px',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
};

const ERROR = {
  color: red[500],
};

const INPUT = {
  width: '260px',
};

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errors: {
        email: [],
        password: [],
        login: [],
      },
    };
  }

  handleSetPassword = (event) => {
    const errMsg = ['must contain at list 8 charecters'];
    this.setState({
      password: event.target.value,
      errors: {
        password: validatePass(event.target.value) ? [] : errMsg,
      },
    });
  }

  handleSetLogin = (event) => {
    const errMsg = ['invailid email address'];
    this.setState({
      email: event.target.value,
      errors: {
        email: validateEmail(event.target.value) ? [] : errMsg,
      },
    });
  }

  handleLogin = () => {
    const {
      email,
      password,
    } = this.state;
    const {
      onLogin,
    } = this.props;
    axios.post(API_CONST.LOGIN, {
      password,
      email,
    }).then((res) => {
      const { errors, profile, status } = res.data;
      if (status === 'success') {
        onLogin(profile);
      } else {
        this.setState({
          errors: {
            login: errors.login,
            email: errors.email,
            password: errors.password,
          },
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  handleSubmit = (e) => {
    const {
      errors,
    } = this.state;
    const passError = !_.isEmpty(errors.password);
    const emailError = !_.isEmpty(errors.email);
    if (!emailError && !passError) {
      this.handleLogin();
    }
    e.preventDefault();
  }

  renderError = msgs => msgs && msgs.map(msg => <Typography key={msg} style={ERROR} variant="body2">{msg}</Typography>);

  render() {
    const {
      password,
      email,
      errors,
    } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    const passError = !_.isEmpty(errors.password);
    const emailError = !_.isEmpty(errors.email);
    return (
      <form
        id="loginForm"
        onSubmit={this.handleSubmit}
        onChange={this.handleFormChange}
        style={FORM}
      >
        <div id="alkashPicture" style={IMG} />
        <Typography component="h1" variant="h4" style={TITLE}>
          Hello, Alkash!!!
        </Typography>
        <Typography component="h2" variant="subtitle1" style={SUBTITLE}>
          Explore alco-possibilities with new awesome service Popoeshnick
        </Typography>
        <TextField
          required
          label="email"
          margin="dense"
          type="email"
          style={INPUT}
          onChange={this.handleSetLogin}
          error={emailError}
          helperText={errors.email}
        />
        <TextField
          required
          label="password"
          margin="dense"
          type="password"
          style={INPUT}
          onChange={this.handleSetPassword}
          error={passError}
          helperText={errors.password}
        />
        {!_.isEmpty(errors.login) && this.renderError(errors.login)}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
          // onClick={this.handleLogin}
          disabled={!email || !password || passError || emailError || !_.isEmpty(errors.loginError)}
        >
          Log in
        </Button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func,
};

LoginForm.defaultProps = {
  onLogin: () => {},
};
