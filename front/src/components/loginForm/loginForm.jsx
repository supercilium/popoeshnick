/* eslint-disable react/jsx-one-expression-per-line */
import React, { PureComponent } from 'react';
import {
  TextField,
  Button,
  Typography,
  withStyles,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import PropTypes, { any } from 'prop-types';
import _ from 'lodash';
import axios from 'axios';

import Image from './alkashs.png';
import { validateEmail, validatePass } from '../../utils';
import { API_CONST } from '../../constants';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    marginTop: '20px',
  },
  subtitle: {
    marginTop: '10px',
  },
  img: {
    flex: '1',
    backgroundImage: `url(${Image})`,
    width: '260px',
    height: '193px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
  error: {
    color: red[500],
  },
  input: {
    width: '260px',
  },
  button: {
    marginTop: '10px',
  },
});

export class LoginForm extends PureComponent {
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

  renderError = (msgs) => {
    const { classes } = this.props;
    return msgs && msgs.map(msg => <Typography key={msg} classes={{ root: classes.error }} variant="body2">{msg}</Typography>);
  }

  render() {
    const {
      password,
      email,
      errors,
    } = this.state;
    const { classes } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const passError = !_.isEmpty(errors.password);
    const emailError = !_.isEmpty(errors.email);
    return (
      <form
        id="loginForm"
        onSubmit={this.handleSubmit}
        onChange={this.handleFormChange}
        className={classes.form}
      >
        <div id="alkashPicture" className={classes.img} />
        <Typography component="h1" variant="h4" classes={{ root: classes.title }}>
          Hello, Alkash!!!
        </Typography>
        <Typography component="h2" variant="subtitle1" classes={{ root: classes.subtitle }}>
          Explore alco-possibilities with new awesome service Popoeshnick
        </Typography>
        <TextField
          required
          label="email"
          margin="dense"
          type="email"
          className={classes.input}
          onChange={this.handleSetLogin}
          error={emailError}
          helperText={errors.email}
        />
        <TextField
          required
          label="password"
          margin="dense"
          type="password"
          className={classes.input}
          onChange={this.handleSetPassword}
          error={passError}
          helperText={errors.password}
        />
        {!_.isEmpty(errors.login) && this.renderError(errors.login)}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
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
  classes: any,
};

LoginForm.defaultProps = {
  onLogin: () => {},
  classes: {},
};

export default withStyles(styles)(LoginForm);
