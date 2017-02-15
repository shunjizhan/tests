import React, { Component } from 'react';
import Tree from './TreeNode'

var data = {
  "id": 1,
  "filename": "All Categories",
  "category": "folder",
  "children": [
    {
      "id": 2,
      "filename": "For Sale",
      "category": "folder",
      "children": [
        {
          "id": 3,
          "filename": "Audio & Stereo",
          "category": "file"
        },
        {
          "id": 4,
          "filename": "Baby & Kids Stuff",
          "category": "file"
        },
        {
          "id": 5,
          "filename": "Music, Films, Books & Games",
          "category": "file"
        }
      ]
    },
    {
      "id": 6,
      "filename": "Motors",
      "category": "folder",
      "children": [
        {
          "id": 7,
          "filename": "Car Parts & Accessories",
          "category": "file"
        },
        {
          "id": 8,
          "filename": "Cars",
          "category": "file"
        },
        {
          "id": 13,
          "filename": "Motorbike Parts & Accessories",
          "category": "file"
        }
      ]
    },
    {
      "id": 9,
      "filename": "Jobs",
      "category": "folder",
      "children": [
        {
          "id": 10,
          "filename": "Accountancy",
          "category": "file"
        },
        {
          "id": 11,
          "filename": "Financial Services & Insurance",
          "category": "file"
        },
        {
          "id": 12,
          "filename": "Bar Staff & Management",
          "category": "file"
        }
      ]
    }
  ]
}

class App extends Component {
  render() {
    return (
      <div className='folder-tree'>
        <Tree data={data} onChange={selectedFolders => console.log(selectedFolders)} />
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

