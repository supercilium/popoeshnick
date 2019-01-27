import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hello, Alkash!!
          </p>
          <TextField
            required
            id="standard-required"
            label="email"
            margin="normal"
          />
          <TextField
            required
            id="standard-required"
            label="password"
            margin="normal"
          />
        </header>
      </div>
    );
  }
}

export default App;
