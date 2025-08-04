import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import { CurrencyProvider } from './context/CurrencyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyProvider>
      <CartProvider>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </CartProvider>
    </CurrencyProvider>
  </StrictMode>,
)