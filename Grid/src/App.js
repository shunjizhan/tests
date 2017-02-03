import React, { Component } from 'react';
import { Grid } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

import { connect } from 'react-redux'
import { createStore } from 'redux'

// move reducer to a file
function reducer(state = [], action) {
	switch (action.type) {
		case 'randomTable':
			// return [["QQQ", "WWW"]]
			return [...action.table]

		case 'clearTable':
			return []

		default:
			// return tableGen(3,3)
			return tableGen(3,3)
	}
}

const store = createStore(reducer)


const mapState = state => {
	table: state.table
}

const mapDispatch = dispatch => {
	randomTable: () => {
		dispatch({ 
			type: 'randomTable', 
			table: tableGen(3,3)
		})
	}
}

class App extends Component {
  constructor(props) {
    super(props);
    sdasd
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

    console.log('table:')
    for(let i = 0; i < list.length; i++) 
    	console.log(list[i])

    if(list[0] != null) {
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

	        <div id='buttons'>
	        	<button onClick={this.props.randomTable}>random table</button>
	        </div>
	      </div>
	    );
	} else {
		return (
			<div id='buttons'>
	        	<button onClick={this.props.randomTable}>random table</button>
	        	<button onClick={this.props.clearTable}>clear table</button>
	        </div>
		)
	}

  }
}



//*************** helper functions ***************//
// reducer file
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
		// color += letters[rand(16)];
	}
	return color;
}
//************************************************//


const Table = connect(mapState, mapDispatch)(App)
export default Table;


