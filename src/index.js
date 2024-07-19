import React from 'react';
import { createRoot } from 'react-dom/client'; // Neueste Methode zum Rendern
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/sketchy/bootstrap.min.css'; // Richtig referenzierte Datei

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
