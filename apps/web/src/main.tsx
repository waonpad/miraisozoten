/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import ReactDOM from 'react-dom/client';

import { env } from '@/constants/env';

import reportWebVitals from './report-web-vitals';
import { Routes } from './routes';

import './index.css';

const initMocks = (): Promise<void> => {
  if (env.VITE_APP_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { initMocks } = require('./__mocks__/server');

    return initMocks;
  }
  return Promise.resolve();
};

initMocks().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});
