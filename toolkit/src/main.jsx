import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import store from './store/index.js';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>,

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
