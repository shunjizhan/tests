import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createStore } from 'redux'

let gen = require('random-seed');

function reducer(state = [], action) {
	switch (action.type) {
		case 'CHANGE':
		return action.table;

		default:
		return tableGen(10,10)
	}
}

const store = createStore(reducer)

const render = () =>  { 
	// let table = tableGen(10,10)
	
	ReactDOM.render(
		<App
			table={ store.getState() }
			change={ () => store.dispatch({ type: 'CHANGE', table: tableGen(10,10) }) }
		/>,
		document.getElementById('root')
	)
}

render()
store.subscribe(render)



//*** helper functions ***//
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
	let date = new Date();
	let rand = gen.create(date.getTime())

	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 3; i++ ) {
		// color += letters[Math.floor(Math.random() * 16)];
		color += letters[rand(16)];
	}
	return color;
}

