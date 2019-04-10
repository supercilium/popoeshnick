/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
// import font awesome icons
import {
  faSpinner,
  faBars,
  faUser,
  faSignOutAlt,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import {
  withStyles,
} from '@material-ui/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import whyDidYouUpdate from 'why-did-you-update';
import Image from './bg.jpg';

import { StartScreen } from './routers/startPage';
import { Profile } from './routers/profile';
// import { Footer } from './components/footer';
import { ROUT_CONST } from './constants';

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

const styles = {
  app: {
    textAlign: 'center',
  },
  appContainer: {
    minHeight: '100vh',
    backgroundImage: `url(${Image})`,
  },
};

const App = ({ classes }) => (
  <Router>
    <div className={classes.app}>
      <div className={classes.appContainer}>
        {/* <StartScreen /> */}
        <Route exact path="/" component={StartScreen} />
        <Route path={`/${ROUT_CONST.PROFILE_PAGE}`} component={Profile} />
        {/* TODO <Footer> component */}
        {/* <Footer /> */}
      </div>
    </div>
  </Router>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
