import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthenticateContext } from './redux';

ReactDOM.render(
  <React.StrictMode>
    <AuthenticateContext>
      <App />
    </AuthenticateContext>
  </React.StrictMode>,
  document.getElementById('root')
);

