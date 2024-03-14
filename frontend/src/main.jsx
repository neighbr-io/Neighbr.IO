import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store.js';
// Using Fetch for testing/placeholder
// import Fetch from './features/projects/fetch.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        {/* <Fetch /> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);