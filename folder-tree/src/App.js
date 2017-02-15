import React, { Component } from 'react';
// import { connect, Provider } from 'react-redux'

import Tree from './TreeNode'

var data = {
  "id": 1,
  "filename": "All Categories",
  "catagory": "folder",
  "children": [
    {
      "id": 2,
      "filename": "For Sale",
      "catagory": "folder",
      "children": [
        {
          "id": 3,
          "filename": "Audio & Stereo",
          "catagory": "file"
        },
        {
          "id": 4,
          "filename": "Baby & Kids Stuff",
          "catagory": "file"
        },
        {
          "id": 5,
          "filename": "Music, Films, Books & Games",
          "catagory": "file"
        }
      ]
    },
    {
      "id": 6,
      "filename": "Motors",
      "catagory": "folder",
      "children": [
        {
          "id": 7,
          "filename": "Car Parts & Accessories",
          "catagory": "file"
        },
        {
          "id": 8,
          "filename": "Cars",
          "catagory": "file"
        },
        {
          "id": 13,
          "filename": "Motorbike Parts & Accessories",
          "catagory": "file"
        }
      ]
    },
    {
      "id": 9,
      "filename": "Jobs",
      "catagory": "folder",
      "children": [
        {
          "id": 10,
          "filename": "Accountancy",
          "catagory": "file"
        },
        {
          "id": 11,
          "filename": "Financial Services & Insurance",
          "catagory": "file"
        },
        {
          "id": 12,
          "filename": "Bar Staff & Management",
          "catagory": "file"
        }
      ]
    }
  ]
}

// data = {
//       "id": 1,
//       "filename": "Jobs",
//       "catagory": "folder",
//       "children": [
//           {
//             "id": 2,
//             "filename": "Accountancy",
//             "catagory": "folder",
//             "children": [
//                 {
//                   "id": 3,
//                   "filename": "Accountancy",
//                   "catagory": "file",
//                 },
//                 {
//                   "id": 4,
//                   "filename": "Financial Services & Insurance",
//                   "catagory": "file"
//                 },
//                 {
//                   "id": 5,
//                   "filename": "Bar Staff & Management",
//                   "catagory": "file"
//                 }
//               ]
//         },
//         {
//           "id": 6,
//           "filename": "Financial Services & Insurance",
//           "catagory": "file"
//         },
//         {
//           "id": 7,
//           "filename": "Bar Staff & Management",
//           "catagory": "file"
//         }
//       ]
//     }

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.cellRenderer = this.cellRenderer.bind(this);
  // }

  render() {
    return (
      <div className='folder-tree'>
        <Tree data={data} />
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
