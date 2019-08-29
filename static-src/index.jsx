/*
* Imports styles.
*/

import './styles.css';


/*
*  Imports libraries.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


/*
*  Imports utilities and subcomponents.
*/

import App from './components/App';
import rootReducer from './state/reducers';


/*
* Create Redux store, attach to app, mount root component.
*/

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react'),
  );
});
