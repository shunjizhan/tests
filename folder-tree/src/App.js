import React, { Component } from 'react';
// import Tree from './TreeNode'
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
          "category": "folder",
          "children": [
    {
      "id": 4,
      "filename": "For Sale",
      "category": "folder",
      "children": [
        {
          "id": 5,
          "filename": "Audio & Stereo",
          "category": "file"
        },
        {
          "id": 6,
          "filename": "Baby & Kids Stuff",
          "category": "file"
        },
        {
          "id": 7,
          "filename": "Music, Films, Books & Games",
          "category": "file"
        }
      ]
    },
    {
      "id": 8,
      "filename": "Motors",
      "category": "folder",
      "children": [
        {
          "id": 9,
          "filename": "Car Parts & Accessories",
          "category": "file"
        },
        {
          "id": 10,
          "filename": "Cars",
          "category": "file"
        },
        {
          "id": 11,
          "filename": "Motorbike Parts & Accessories",
          "category": "file"
        }
      ]
    },
    {
      "id": 12,
      "filename": "Jobs",
      "category": "folder",
      "children": [
        {
          "id": 13,
          "filename": "Accountancy",
          "category": "file"
        },
        {
          "id": 14,
          "filename": "Financial Services & Insurance",
          "category": "file"
        },
        {
          "id": 15,
          "filename": "Bar Staff & Management",
          "category": "file"
        }
      ]
    }
  ]
        },
        {
          "id": 16,
          "filename": "Baby & Kids Stuff",
          "category": "file"
        },
        {
          "id": 17,
          "filename": "Music, Films, Books & Games",
          "category": "file"
        }
      ]
    },
    {
      "id": 18,
      "filename": "Motors",
      "category": "folder",
      "children": [
        {
          "id": 19,
          "filename": "Car Parts & Accessories",
          "category": "file"
        },
        {
          "id": 20,
          "filename": "Cars",
          "category": "file"
        },
        {
          "id": 21,
          "filename": "Motorbike Parts & Accessories",
          "category": "file"
        }
      ]
    },
    {
      "id": 22,
      "filename": "Jobs",
      "category": "folder",
      "children": [
        {
          "id": 23,
          "filename": "Accountancy",
          "category": "file"
        },
        {
          "id": 24,
          "filename": "Financial Services & Insurance",
          "category": "file"
        },
        {
          "id": 25,
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
    // return <CheckBox status={0.5} handleCheck={ () => {} }/>
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

