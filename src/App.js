import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import Counter from './Counter.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello, World! </h1>

        <div className="playground-container">
            <div className="counter">
                <Counter />
            </div>
        </div>

      </div>
    );
  }
}

export default hot(module)(App);
