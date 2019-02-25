/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
// import font awesome icons
import { faSpinner, faBars, faUser } from '@fortawesome/free-solid-svg-icons';

import { StartScreen } from './routers/startPage';
import { Profile } from './routers/profile';
import { Footer } from './components/footer';
import { ROUT_CONST } from './constants';

// font awesome icons add here
// only added icons will be loaded to bundle
library.add(
  faSpinner,
  faBars,
  faUser,
);

const App = () => (
  <Router>
    <div className="App">
      <div className="App-container">
        {/* <StartScreen /> */}
        <Route exact path="/" component={StartScreen} />
        <Route path={`/${ROUT_CONST.PROFILE_PAGE}`} component={Profile} />
        {/* TODO <Footer> component */}
        <Footer />
      </div>
    </div>
  </Router>
);


export default App;
