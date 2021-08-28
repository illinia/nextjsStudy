import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button.js';

function Container() {
  return React.createElement(
    'div',
    null,
    React.createElement(
      Button,
      null
    )
  )
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);