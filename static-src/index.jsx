/*
*   Imports libraries.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

/*
*   Imports utilities and subcomponents.
*/

import App from './components/App.jsx';

// const MyComponent = () => <div>This is dynamic content from React!</div>;

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('react'),
  );
});
