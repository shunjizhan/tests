import React, { Component } from 'react';
import { Grid } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: tableGen(30, 10)
    // };
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  cellRenderer ({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style} >
        {this.props.value[rowIndex][columnIndex]}
      </div>
    );  
  }

  render() {
    // let list = this.state.data;
    let list = this.props.value;

    return (
      <div>
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
        <button onClick={this.props.change}>change</button>
      </div>
    );
  }
}

//*** helper functions ***//
// function tableGen(row, colume) {
//   let table = [];
//   let aColume = [];
//   for(let i = 0; i < row; i++) {
//     for(let j = 0; j < colume; j++) {
//       aColume[j] = randomColor();
//     }
//     table[i] = aColume;
//     aColume = [];
//   }
//   return table;
// }

// function randomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 3; i++ ) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

export default App;



