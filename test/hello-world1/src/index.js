import React from 'react';
import ReactDOM from 'react-dom';
import test from './test';

function Container() {
  return React.createElement(
    test,
    null
  )
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);