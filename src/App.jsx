import React, { useState } from 'react'
import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorBoundary from './components/ErrorBoundary'
import PrivateRoute from './components/PrivateRoute'
import useCart from './hooks/useCart'
import './App.css'

export default function App() {
  const location = useLocation()
  const { count } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="app">
      <header className="nav">
        <h1 className="brand">seizeonstar.catalog</h1>
        <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Buka menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={isMenuOpen ? 'open' : ''}>
          <NavLink to="/products" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Products</NavLink>
          <NavLink to="/cart" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>
            Cart {count > 0 && <span className="cart-badge">{count}</span>}
          </NavLink>
          <NavLink to="/checkout" className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Checkout</NavLink>
          <NavLink to="/login" state={{ from: location }} className={({isActive}) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<PrivateRoute><ErrorBoundary><Products /></ErrorBoundary></PrivateRoute>} />
          <Route path="/products/:id" element={<PrivateRoute><ErrorBoundary><ProductDetail /></ErrorBoundary></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><ErrorBoundary><Cart /></ErrorBoundary></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div style={{padding:20}}>404 - Page not found</div>} />
        </Routes>
      </main>

      <footer className="footer">© {new Date().getFullYear()} seizeonstar.catalog</footer>
    </div>
  )
}
