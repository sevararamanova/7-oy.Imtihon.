import React from 'react';
import ReactDOM from 'react-dom/client'; // createRoot ni import qilamiz
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot dan foydalanamiz

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
