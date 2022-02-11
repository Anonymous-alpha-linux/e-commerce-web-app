import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { AuthenticateContext } from './redux';

render(
  <React.StrictMode>
    <AuthenticateContext>
      <App />
    </AuthenticateContext>
  </React.StrictMode>,
  document.getElementById('root')
);

