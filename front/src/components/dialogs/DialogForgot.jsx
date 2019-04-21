import React, { PureComponent } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  withStyles,
} from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';

import './dialog.css';
import { validateEmail } from '../../utils';
import { API_CONST } from '../../constants';

const styles = ({
  button: {
    marginTop: '20px',
  },
});
export class DialogForgot extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      infoSent: false,
      titleText: '',
      errors: {
        email: '',
        recovery: '',
      },
    };
  }

  handleOnExited = () => {
    this.setState({
      email: null,
      infoSent: false,
      titleText: '',
      errors: {
        email: '',
        recovery: '',
      },
    });
  }

  onSetEmail = (event) => {
    const errMsg = ['invailid email address'];
    this.setState({
      email: event.target.value,
      errors: {
        email: validateEmail(event.target.value) ? [] : errMsg,
      },
    });
  }

  handlePasswordRecovery = () => {
    const { email } = this.state;
    axios.post(API_CONST.PASSWORD, {
      email,
    }).then((response) => {
      const {
        status,
        errors,
      } = response.data;
      if (status === 'success') {
        this.setState({ infoSent: true, titleText: 'Please check your email for further instructions' });
      } else if (!_.isEmpty(errors.recovery)) {
        this.setState({
          infoSent: true,
          titleText: 'Error',
          errors: {
            email: errors.email,
            recovery: errors.recovery,
          },
        });
      } else {
        this.setState({
          errors: {
            email: errors.email,
          },
        });
      }
    }).catch((response) => {
      this.setState({ infoSent: true, titleText: `Sorry, something gone wrong... ${response}` });
    });
  }

  handleSubmit = (e) => {
    const { email } = this.state;
    e.preventDefault();
    if (validateEmail(email)) {
      this.handlePasswordRecovery();
    }
  }

  render() {
    const { open, onClose, classes } = this.props;
    const {
      infoSent,
      titleText,
      email,
      errors,
    } = this.state;
    const emailError = !_.isEmpty(errors.email);
    if (infoSent) {
      return (
        <Dialog
          open={open}
          onClose={onClose}
          onExited={this.handleOnExited}
        >
          <DialogTitle>{titleText}</DialogTitle>
          <DialogContent>
            <div className="dialog-style">
              {errors.recovery && <Typography component="subtitle1" variant="subtitle1">{errors.recovery}</Typography>}
              <Button>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <Dialog
        open={open}
        onClose={onClose}
        onExited={this.handleOnExited}
      >
        <DialogTitle>Enter your email to get confirmation code</DialogTitle>
        <DialogContent>
          <form
            onSubmit={this.handleSubmit}
            className="dialog-style"
          >
            <TextField
              required
              label="Enter email"
              margin="normal"
              onChange={this.onSetEmail}
              error={emailError}
              helperText={emailError && 'enter a valid email'}
            />
            <Button
              variant="contained"
              color="primary"
              classes={{ root: classes.button }}
              type="submit"
              disabled={!email || emailError}
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
  classes: PropTypes.any.isRequired,
};

export default withStyles(styles)(DialogForgot);
