import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import './style.scss';

import "./assets/css/font-awesome.min.css";
import "./assets/css/font-awesomev5.8.2.css";
import "./assets/css/font-awesome4.7.0.css";
import "./assets/css/font-awesome.min.css";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
