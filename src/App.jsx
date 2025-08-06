import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import './App.css'
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* More routes will be added soon */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
