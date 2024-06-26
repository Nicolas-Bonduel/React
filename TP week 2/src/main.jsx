import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import store from './store/index.js';
import {BrowserRouter as Router} from "react-router-dom";
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <div id='stars'></div>
    <div id='stars2'></div>
    <div id='stars3'></div>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>
)
