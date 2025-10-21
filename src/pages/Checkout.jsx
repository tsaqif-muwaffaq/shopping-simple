import React from 'react'
import { useNavigate } from 'react-router-dom'
import useCart from '../hooks/useCart'
import { toIDR } from '../utils/currency'
import { useAuth } from '../contexts/AuthContext'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    alert(`Thank you, ${user?.name || 'customer'}! Order placed. Total: ${toIDR(total)}`)
    clear()
    navigate('/products')
  }

  return (
    <div>
      <h2>Checkout</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-list">
            {items.map(it => (
              <div className="cart-item" key={it.id}>
                <img src={it.image} alt={it.title} />
                <div className="meta">
                  <h4>{it.title}</h4>
                  <p>{it.qty} x {toIDR(it.price)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Total: <strong>{toIDR(total)}</strong></p>
            <button onClick={handleCheckout}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  )
}
