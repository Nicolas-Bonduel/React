import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import SpendingsContextProvider from './context/useSpendingsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <SpendingsContextProvider>
      <App />
    </SpendingsContextProvider>
)
