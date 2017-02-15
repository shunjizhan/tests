import React, { Component } from 'react';
// import { connect, Provider } from 'react-redux'

import TreeNode from './TreeNode'

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.cellRenderer = this.cellRenderer.bind(this);
  // }

  render() {
    return (
      <div>
        <TreeNode catagory='folder' level={0}/>
        <TreeNode catagory='folder' level={1}/>
        <TreeNode catagory='file' level={1}/>
      </div>
    )

  }
}

// const mapState = state => {
//   return {
//     table: state
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     randomTable: () => {
//       dispatch({ 
//         type: 'randomTable', 
//         // table: tableGen(rand(10) * 1.5 + 1, rand(10) + 1),
//         table: tableGen(3,3)
//       })
//     },
//     clearTable: () => {
//       dispatch({
//         type: 'clearTable'
//       })
//     }
//   }
// }

// const Table = connect(mapState, mapDispatch)(App);
// export default Table;

export default App;


//*************** helper functions ***************//
// reducer file
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
//     // color += letters[rand(16)];
//   }
//   return color;
// }
//************************************************//
