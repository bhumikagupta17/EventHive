import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { EventProvider } from './context/EventContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ToastProvider>
      <AuthProvider>
        <EventProvider>
          <App/>
        </EventProvider>
      </AuthProvider>
    </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
