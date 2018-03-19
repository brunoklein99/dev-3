import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

class App extends Component {
  componentDidMount() {
    axios
      .get('http://localhost:8080/login')
      .then((res) => {
        console.log('### res', res)
      })
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Welcome to React</h1>
      </div>
    );
  }
}

export default App;
