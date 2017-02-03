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
        {this.props.table[rowIndex][columnIndex]}
      </div>
    );  
  }

  render() {
    // let list = this.state.data;
    let list = this.props.table;

    for(let i = 0; i < list.length; i++) 
    	console.log(list[i])

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

          <button onClick={this.props.change}>random table</button>
      </div>
    );
  }
}

export default App;



