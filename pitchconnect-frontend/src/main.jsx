import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App'; // fixed the path
import './index.css'; // only include if you have this file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
