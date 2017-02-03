import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import { Grid } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import './index.css';
// import Table from './App';

class App extends Component {
  constructor(props) {
    super(props);
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  cellRenderer ({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style} >
        {this.props.table[rowIndex][columnIndex]}
      </div>
    );  
  }

  componentDidUpdate(prevProps, prevState) {
  	console.log(this.props.table)
  	if (this.table != null && this.props.table !== prevProps.table) {
  		this.table.forceUpdate();
  	}
  }


  render() {
    let list = this.props.table;

    console.log('table:');
    for(let i = 0; i < list.length; i++) 
    	console.log(list[i]);

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
	          ref={node => this.table = node}
	          // height={500}
	        />

	        <div id='buttons'>
	        	<button onClick={this.props.randomTable}>random table</button>
	        	<button onClick={this.props.clearTable}>clear table</button>
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

// move reducer to a file
function reducer(state = [], action) {
	switch (action.type) {
		case 'randomTable':
			return action.table

		case 'clearTable':
			return []

		default:
			return tableGen(3,3)
	}
}
const store = createStore(reducer, []);

const mapState = state => {
	return {
		table: state
	}
}

const mapDispatch = dispatch => {
	return {
		randomTable: () => {
			dispatch({ 
				type: 'randomTable', 
				// table: tableGen(rand(10) * 1.5 + 1, rand(10) + 1),
				table: tableGen(3,3)
			})
		},
		clearTable: () => {
			dispatch({
				type: 'clearTable'
			})
		}
	}
}

const Table = connect(mapState, mapDispatch)(App);

ReactDOM.render(
	// wrap this in provider, put store in the react context
	<Provider store={store}>
		<Table />
	</Provider>,
	document.getElementById('root')
)

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











