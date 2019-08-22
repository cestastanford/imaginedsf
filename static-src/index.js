import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const MyComponent = () => <div>This is dynamic content from React!</div>;

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MyComponent />,
    document.getElementById('react'),
  );
});
