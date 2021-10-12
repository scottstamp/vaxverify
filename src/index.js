import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/cyborg/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();