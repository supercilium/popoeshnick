/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
} from '@material-ui/core';
import {
  LoginForm,
  DialogSignup,
  DialogForgot,
} from '../../components';
import * as alkashActions from '../../__data__/actions/alkashActions';

// const styles = {
//   app: {
//     textAlign: 'center',
//   },
//   appContainer: {
//     minHeight: '100vh',
//     backgroundImage: `url(${Image})`,
//     backgroundSize: 'cover',
//   },
// };


const styles = {
  appHeader: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // fontSize: calc(10px + 2vmin),
    color: 'rgb(223, 17, 17)',
    minHeight: '100vh',
    /* padding: 0 30px 40px; */
  },
  button: {
    marginTop: '15px',
    marginBottom: '15px',
  },
};

export class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openSignup: false,
      openForgot: false,
    };
  }

  // eslint-disable-next-line react/destructuring-assignment
  handleLogin = profile => this.props.alkashActions.setAlkash(profile);

  // eslint-disable-next-line react/destructuring-assignment
  handleSendQuery = profile => this.props.alkashActions.setAlkash(profile);

  handleCloseSignup = () => this.setState({ openSignup: false });

  handleOpenSignup = () => this.setState({ openSignup: true });

  handleCloseForgot = () => this.setState({ openForgot: false });

  handleOpenForgot = () => this.setState({ openForgot: true });

  render() {
    const {
      classes,
    } = this.props;
    return (
      <header className={classes.appHeader}>
        <LoginForm
          onLogin={this.handleLogin}
        />
        <Button classes={{ root: classes.button }} onClick={this.handleOpenForgot}>
          Forgot password?
        </Button>
        <Button onClick={this.handleOpenSignup}>
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
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  alkashActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    alkash: state.alkash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alkashActions: bindActionCreators(alkashActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));
