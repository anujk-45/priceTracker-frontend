import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/index.css';
import App from './App';

window.a = true;
window.b = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

