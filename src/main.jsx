import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
          <Toaster position="top-center" reverseOrder={false} />
        </CartProvider>
      </WishlistProvider>
    </CurrencyProvider>
  </StrictMode>,
)

// WishlistProvider