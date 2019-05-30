/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';
import _ from 'lodash';
// import font awesome icons
import {
  faSpinner,
  faBars,
  faUser,
  faSignOutAlt,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import whyDidYouUpdate from 'why-did-you-update';
import {
  Loader,
} from './components';

import { LoginPage } from './routers/login';
import { StartScreen } from './routers/startPage';
import { Profile } from './routers/profile';
// import { Footer } from './components/footer';
import { ROUT_CONST, API_CONST } from './constants';
import * as alkashActions from './__data__/actions/alkashActions';

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}
// font awesome icons add here
// only added icons will be loaded to bundle
library.add(
  faSpinner,
  faBars,
  faUser,
  faSignOutAlt,
  faUserCog,
);

const cookies = new Cookies();

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { setAlkash } = this.props.alkashActions;
    this.setState({ loader: true });
    const cookie = cookies.get('session');
    if (cookie) {
      axios.get(API_CONST.PROFILE).then((res) => {
        const { errors, profile, status } = res.data;
        if (status === 'success') {
          setAlkash(profile);
        } else {
          console.log(errors);
        }
      }).catch((error) => {
        console.log(error);
      }).then(() => this.setState({ loader: false }));
    } else {
      this.setState({ loader: false });
    }
  }

  renderContent = () => {
    const {
      alkash,
    } = this.props;
    // TODO do redirect to LoginPage then not auth
    // like this example https://stackoverflow.com/questions/48497510/simple-conditional-routing-in-reactjs
    const isAuth = !_.isEmpty(alkash);
    return (
      // isAuth
      <Router>
        {/* <StartScreen /> */}
        {/* <Route exact path="/" component={StartScreen} /> */}
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute path='/' auth={isAuth} component={StartScreen} />
        {/* <Route path={`/${ROUT_CONST.PROFILE_PAGE}`} component={Profile} /> */}
        {/* TODO <Footer> component */}
        {/* <Footer /> */}
      </Router>
    );
  }

  render() {
    const {
      loader,
    } = this.state;
    const {
      classes,
    } = this.props;
    return (
      loader ? <Loader /> : this.renderContent(classes)
    );
  }
}

class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props
    return (
      <Route
        {...props}
        render={props => (
          this.props.isAuth ?
            <Component {...props} /> :
            // <Redirect to='/login' />
            <div></div>
        )}
      />
    )
  }
}

App.propTypes = {
  alkash: PropTypes.any,
  classes: PropTypes.object.isRequired,
  alkashActions: PropTypes.object.isRequired,
};

App.defaultProps = {
  alkash: {},
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
