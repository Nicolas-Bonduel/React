import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import SpendingsContextProvider from './context/useSpendingsContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <div id='stars'></div>
    <div id='stars2'></div>
    <div id='stars3'></div>
    <SpendingsContextProvider>
      <App />
    </SpendingsContextProvider>
  </>
)
