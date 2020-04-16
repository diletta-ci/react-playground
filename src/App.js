import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

// Style
import './style/reset.css';
import './style/App.css';

// Games components
import Counter from './components/Counter.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React playground</h1>

        <div className="playground-container">
            <div className="counter">
                <h2>Counter component</h2>
                <Counter />
            </div>

            <div className="github-cards-app">
                <h2>GitHub cards app</h2>
            </div>
        </div>

      </div>
    );
  }
}

export default hot(App);
