import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="alkashPicture"></div>
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
          <Button variant="contained" color="primary" style = {{marginTop: '10px'}} >
            Log in
          </Button>
          <Button href="#text-buttons" style={{marginTop: '15px', marginBottom: '15px'}} >
            Forgot password?
          </Button>
          <Button href="#text-buttons" >
            Registration
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
