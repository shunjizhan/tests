import React, { Component } from 'react';
import { Grid } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

const list = tableGen(3000, 20);

function cellRenderer ({ columnIndex, key, rowIndex, style }) {
  return (
    <div
      key={key}
      style={style}
    >
      {list[rowIndex][columnIndex]}
    </div>
  )  
}

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

class App extends Component {
  render() {
    return (
       <Grid
        cellRenderer={cellRenderer}
        columnCount={list[0].length}      
        columnWidth={50}
        width={list[0].length * 50}
        rowCount={list.length}
        rowHeight={20}    
        height={list.length * 20}
      />
    );
  }
}

export default App;
