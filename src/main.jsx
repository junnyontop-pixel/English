import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ 이 줄이 꼭 있어야 해!
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);