import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import Table from './App';
import store from './reducer'


ReactDOM.render(
	// wrap this in provider, put store in the react context
	<Provider store={store}>
		<Table />
	</Provider>,
	document.getElementById('root')
)

