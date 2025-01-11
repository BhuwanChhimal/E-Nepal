import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

// Get the root element from your HTML file
const rootElement = document.getElementById('root');

// Create a React root
const root = createRoot(rootElement);

// Render the application, wrapped with BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);