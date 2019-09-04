/*
* Imports libraries.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
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

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */


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
    document.getElementById('react'),
  );
});
