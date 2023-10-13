import React from 'react';
import ReactDOM from 'react-dom/client';

// import { Routes } from '@generouted/react-router';

import reportWebVitals from './report-web-vitals';
import { Routes } from './routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
