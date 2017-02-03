import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createStore } from 'redux'

let gen = require('random-seed');
let date = new Date();
let rand = gen.create(date.getTime())

function reducer(state = [], action) {
	switch (action.type) {
		case 'randomTable':
			// return [["QQQ", "WWW"]]
			return action.table

		case 'clearTable':
			return []

		default:
			return tableGen(3,3)
	}
}

const store = createStore(reducer)

const randomTable = () => {
	store.dispatch({ 
		type: 'randomTable', 
		table: tableGen(rand(10) * 1.5 + 1, rand(10) + 1),
	})
}

const clearTable = () => {
	store.dispatch({ 
		type: 'clearTable', 
	})
}

const render = () =>  { 
	ReactDOM.render(
		<App
			table={ store.getState() }
			randomTable={ randomTable }
			clearTable={ clearTable }
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
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 3; i++ ) {
		// color += letters[Math.floor(Math.random() * 16)];
		color += letters[rand(16)];
	}
	return color;
}

