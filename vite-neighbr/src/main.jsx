import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store.js';
import Fetch from './features/projects/fetch.jsx';
import SignIn from './features/projects/SignIn.jsx';
import SignUp from './features/projects/SignUp.jsx';
import CheckOut from './features/projects/CheckOut.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Fetch />
        <SignIn />
        <SignUp />
        <CheckOut />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);