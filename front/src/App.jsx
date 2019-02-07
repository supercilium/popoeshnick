/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { StartScreen } from './routers/startPage';
import { Profile } from './routers/profile';

const App = () => (
  <Router>
    <div className="App">
      <div className="App-container">
        {/* <StartScreen /> */}
        <Route exact path="/" component={StartScreen} />
        <Route path="/protected" component={Profile} />
        <div id="footer">
          (c) Popoeshnick team
        </div>
      </div>
    </div>
  </Router>
);


export default App;
