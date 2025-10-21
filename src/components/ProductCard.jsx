import React from 'react'
import { Link } from 'react-router-dom'
import { toIDR } from '../utils/currency'

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card">
      <Link to={`/products/${product.id}`}>
        <div className="img-wrap"><img src={product.image} alt={product.title} /></div>
      </Link>
      <div className="card-body">
        <h3 className="title">{product.title}</h3>
        <p className="price">{toIDR(product.price)}</p>
        <div className="actions">
          <button onClick={() => onAdd(product)}>Add to Cart</button>
          <Link to={`/products/${product.id}`} className="btn-link">Details</Link>
        </div>
      </div>
    </article>
  )
}
