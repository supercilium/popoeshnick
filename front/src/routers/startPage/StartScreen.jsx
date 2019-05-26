/* eslint-disable react/jsx-one-expression-per-line */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import {
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as alkashActions from '../../__data__/actions/alkashActions';
import { API_CONST } from '../../constants';


import {
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
      loader: false,
    };
  }

  handleLogout = () => {
    axios.get(API_CONST.LOGOUT).then(() => {
      this.setState({
        loader: true,
      });
    }).then(() => {
      this.setState({
        loader: false,
      });
      this.props.alkashActions.setAlkash({});
    });
  }

  render() {
    const {
      loader,
    } = this.state;
    const {
      alkash,
    } = this.props;
    const isAuth = !_.isEmpty(alkash);
    return (
      <Container
        auth={isAuth}
        handleLogout={this.handleLogout}
      >
        {loader ? <Loader /> : <Home {...alkash} />}
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
