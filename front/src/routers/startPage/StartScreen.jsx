/* eslint-disable react/jsx-one-expression-per-line */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, withStyles,
} from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_CONST } from '../../constants';
import * as alkashActions from '../../__data__/actions/alkashActions';


import {
  LoginForm,
  DialogSignup,
  DialogForgot,
  Loader,
  Home,
  Container,
} from '../../components';


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
export class StartScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openSignup: false,
      openForgot: false,
      loader: false,
    };
  }

  handleLogin = (profile) => {
    this.props.alkashActions.setAlkash(profile);
  };

  handleLogout = () => {
    axios.get(API_CONST.LOGOUT).then(() => {
      this.setState({
        openSignup: false,
        openForgot: false,
        loader: true,
      });
    }).then(() => {
      this.setState({
        loader: false,
      });
      this.props.alkashActions.setAlkash({});
    });
  }

  handleSendQuery = profile => this.props.alkashActions.setAlkash(profile);

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

  renderContent = () => {
    const { classes, alkash } = this.props;
    if (alkash) {
      return <Home {...alkash} />;
    }
    return (
      <header className={classes.appHeader}>
        <LoginForm
          onLogin={this.handleLogin}
        />
        <Button
          classes={{ root: classes.button }}
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
    );
  }

  render() {
    const {
      loader,
    } = this.state;
    const {
      alkash,
    } = this.props;
    return (
      <Container
        auth={!!alkash}
        handleLogout={this.handleLogout}
      >
        {loader ? <Loader /> : this.renderContent()}
      </Container>
    );
  }
}

StartScreen.propTypes = {
  classes: PropTypes.any.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StartScreen));
