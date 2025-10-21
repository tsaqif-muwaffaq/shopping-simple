import React from 'react'
import useCart from '../hooks/useCart'
import { toIDR } from '../utils/currency'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { items, removeFromCart, decrementItem, total, count } = useCart()
  const navigate = useNavigate()

  return (
    <div>
      <h2>My Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {items.map(it => (
            <div className="cart-item" key={it.id}>
              <img src={it.image} alt={it.title} />
              <div className="meta">
                <h4>{it.title}</h4>
                <p>{toIDR(it.price)} x {it.qty}</p>
                <div className="cart-actions">
                  <button onClick={() => decrementItem(it.id)}>-</button>
                  <button onClick={() => removeFromCart(it.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total items: {count}</p>
            <p>Total price: <strong>{toIDR(total)}</strong></p>
            <button onClick={() => navigate('/checkout')}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}
