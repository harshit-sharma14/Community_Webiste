import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'; // Import Tailwind CSS
import { AuthProvider } from './context/AuthContext'; // Import Auth context provider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( // Use root.render instead of ReactDOM.render
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);