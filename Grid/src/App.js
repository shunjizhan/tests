import React, { Component } from 'react';
import { Grid } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

// const t = tableGen(30, 10);

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
  constructor(props) {
    super(props);
    this.state = {
      data: tableGen(30, 10)
      // data: t
    };
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  cellRenderer ({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style} >
        {this.state.data[rowIndex][columnIndex]}
      </div>
    );  
  }

  render() {
    let list = this.state.data;
     // alert(list);
    return (
       <Grid
        cellRenderer={this.cellRenderer}
        columnCount={list[0].length}      
        columnWidth={50}
        width={list[0].length * 50}
        // width={500}
        rowCount={list.length}
        rowHeight={20}    
        height={list.length * 20}
        // height={500}
      />
    );
  }
}

export default App;
