import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

// Style
import './style/reset.css';
import './style/App.css';

// Games
import Counter from './Counter.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> My React Playground </h1>

        <div className="playground-container">
            <div className="counter">
                <h2>Counter component</h2>
                <Counter />
            </div>
        </div>

      </div>
    );
  }
}

export default hot(App);
