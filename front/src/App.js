import React, { Component } from 'react';
import './App.css';

import StartScreen from './routers/startPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <StartScreen />
      </div>
    );
  }
}

export default App;
