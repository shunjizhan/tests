import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Grid } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import './index.css';
// import Table from './App';

import { createModule, connectModule } from 'redux-modules';

const tableModule = createModule({
	name: 'table',
	initialState: {table: tableGen(3,3)},
	selector: state => ({ table: state }),
	transformations: {
		randomTable: {
			reducer: (state, { payload }) => {
				return (state.update('table', table => payload));
			}
		},
	}
}); 

class App extends Component {
  constructor(props) {
    super(props);
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  cellRenderer ({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style} >
        {this.props.table.table[rowIndex][columnIndex]}
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
    let list = this.props.table.table;
    console.log(JSON.stringify(list));

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
	          rowCount={list.length}
	          rowHeight={20}    
	          height={list.length * 20}
	          ref={node => this.table = node}
	        />

	        <div id='buttons'>
	        	<button onClick={this.props.actions.randomTable({ table: tableGen(3,3) })}>random table</button>
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

const store = createStore(tableModule.reducer);
// const store = createStore(tableModule.reducer, tableModule.reducer(undefined, { type: '' }));

const Table = connectModule(tableModule)(App);

ReactDOM.render(
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











