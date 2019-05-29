/* eslint-disable react/jsx-one-expression-per-line */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as alkashActions from '../../__data__/actions/alkashActions';
import { API_CONST } from '../../constants';

import {
  Loader,
  Home,
  Container,
} from '../../components';

export class StartScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }

  handleLogout = () => {
    const {
      // eslint-disable-next-line no-shadow
      alkashActions,
    } = this.props;
    axios.get(API_CONST.LOGOUT).then(() => {
      this.setState({
        loader: true,
      });
    }).then(() => {
      this.setState({
        loader: false,
      });
      alkashActions.setAlkash({});
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
  alkashActions: PropTypes.any.isRequired,
  alkash: PropTypes.any.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
