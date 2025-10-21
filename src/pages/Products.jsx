import React, { useEffect, useState, useCallback } from 'react'
import ProductCard from '../components/ProductCard'
import useCart from '../hooks/useCart'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => { if (mounted) setProducts(data) })
      .catch(err => { if (mounted) setError(err.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => mounted = false
  }, [])

  const handleAdd = useCallback((p) => addToCart(p), [addToCart])

  if (loading) return <div className="center">Loading...</div>
  if (error) return <div className="center error">Error: {error}</div>

  return (
    <section className="grid">
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAdd={handleAdd} />
      ))}
    </section>
  )
}
