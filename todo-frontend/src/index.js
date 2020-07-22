/**
 * Framework imports
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Feature imports
 */
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/**
 * Rendering the main element
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
