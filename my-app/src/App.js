import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  state = {
    data: this.array_gen()
    // generate some big array of objects
  };

  render() {
    // use react virtualized to render the large array
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          {this.state.data}
        </p>

        <button onClick={() => this.setState({ data: [0] })}>
          Clean
        </button>
        
      </div>
    );
  }

  array_gen() {
    var array = [];
    for(var i = 0; i < 10; i++) {
      array[i] = i;
    }
    return array;
  }
}

export default App;
