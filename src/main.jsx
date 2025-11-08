import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeNotifications } from './utils/initializeNotifications'
import { initializeReminders } from './utils/initializeReminders'

// Initialize sample data on first load
initializeNotifications();
initializeReminders();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
