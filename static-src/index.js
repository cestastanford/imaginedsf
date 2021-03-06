/*
* Imports CSS.
*/

import 'bulma/css/bulma.min.css';
import 'leaflet/dist/leaflet.css';


/*
* Imports libraries.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';


/*
* Imports subcomponent, reducer and theme.
*/

import App from './components/App';
import rootReducer from './state/reducers';
import theme from './theme';


/*
* Creates Redux store.
*/

const middleware = [
  applyMiddleware(thunk),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : []), // eslint-disable-line
];

const store = createStore(
  rootReducer,
  compose(...middleware),
);


/*
* Mounts root React component with Redux store and theme.
*/

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('App'),
  );
});
