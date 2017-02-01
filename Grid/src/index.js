import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createStore } from 'redux'

function reducer(state = [], action) {
  switch (action.type) {
    case 'CHANGE':
      let table = tableGen(10,10)
      return table;

    default:
      return [['#AAA', '#BBB', '#CCC'], ['#AAA', '#BBB', '#CCC'], ['#AAA', '#BBB', '#CCC']]
  }
}

const store = createStore(reducer)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <App
    value={store.getState()}
    change={() => store.dispatch({ type: 'CHANGE' })}
  />,
  rootEl
)

render()
store.subscribe(render)



//*** helper functions ***//
function tableGen(row, colume) {
  let table = [];
  let aColume = [];
  for(let i = 0; i < row; i++) {
    for(let j = 0; j < colume; j++) {
      aColume[j] = randomColor();
    }
    table[i] = aColume;
    aColume = [];
  }
  return table;
}

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 3; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
