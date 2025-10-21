import React, { useEffect, useState } from 'react'
import { toIDR } from '../utils/currency'
import { useParams, useNavigate } from 'react-router-dom'
import useCart from '../hooks/useCart'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => { if (mounted) setProduct(data) })
      .catch(err => { if (mounted) setError(err.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => mounted = false
  }, [id])

  if (loading) return <div className="center">Loading...</div>
  if (error) return <div className="center error">Error: {error}</div>
  if (!product) return null

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn-back">← Kembali</button>
      <div className="detail">
        <div className="detail-img"><img src={product.image} alt={product.title} /></div>
        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="price">{toIDR(product.price)}</p>
          <p>{product.description}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
