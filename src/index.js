import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
import { AuthenticateContext } from './redux';

render(
  <React.StrictMode>
    <AuthenticateContext>
      <App />
    </AuthenticateContext>
  </React.StrictMode>,
  document.getElementById('root')
);

