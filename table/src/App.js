import React, { Component } from 'react';
import './App.css';

import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

class App extends Component {
  render() {
    var list = this.list_generate(50);
  
    return ( 
      <Table
        width={999}
        height={999}
        headerHeight={20}
        rowHeight={30}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
      >
        <Column
          width={100}
          label='Name'
          dataKey='name'   
        />
        <Column
          width={100}
          label='Color'
          dataKey='color'
        />
        <Column
          width={100}
          label='Color2'
          dataKey='color2'
        />
        <Column
          width={100}
          label='Color3'
          dataKey='color3'
          // className={dataKey}
        />
      </Table>
    );

  }

  randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  object_generate() {
    // var color = this.randomColor();
    return { 
      name: 'Kobe', 
      color: this.randomColor(), 
      color2: this.randomColor(),
      color3: this.randomColor(),
    };
  }

  list_generate(num) {
    var list = [];
    for(var i = 0; i < num; i++) {
      list[i] = this.object_generate();
    }
    return list;
  }

}

export default App;
