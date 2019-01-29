import React, { Component } from 'react';
import './App.css';

import {StartScreen} from './routers/startPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <StartScreen />
          <div id="footer">
            (c) Popoeshnick team
          </div>
        </div>
      </div>
    );
  }
}

export default App;
