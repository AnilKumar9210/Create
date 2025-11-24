import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './Context/context.jsx'
import { ToastContainer } from 'react-toastify'
import { ErrorBoundary } from 'react-error-boundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={ <section class="dots-container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</section>}>
    <BrowserRouter>
    <AppProvider>
      <ToastContainer />
    <App />
    </AppProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
