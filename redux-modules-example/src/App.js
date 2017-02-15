import React, { Component, PropTypes } from 'react';
import logo from './logo.svg';
import './App.css';

import { createModule, middleware } from 'redux-modules';
import { fromJS, List } from 'immutable';
const  { shape, string, number } = PropTypes;

export default createModule({
  name: 'todos',
  initialState: List(),
  selector: state => ({ todos: state.get('todos') }),
  transformations: {
    create: {
      middleware: [
        middleware.propCheck(
          shape({ description: string.isRequired })
        ),
      ],
      reducer: (state, { payload }) =>
        state.update('collection', todos => todos.push(fromJS(payload))),
    },

    destroy: {
      middleware: [
        middleware.propCheck(number.isRequired),
      ],
      reducer: (state, { payload }) => 
        state.update('collection', todos => todos.delete(payload)),
    },
  },
});

const store = createStore(todoModule.reducer, {});
 
export default const App = props => (
  <Provider store={store}>
    <Todos {...props}/>
  </Provider>
)
