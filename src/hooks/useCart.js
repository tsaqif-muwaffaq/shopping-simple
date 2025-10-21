import { useCallback } from 'react'
import { useCartContext } from '../contexts/CartContext'

export default function useCart() {
  const { items, add, remove, decrement, clear, total, count } = useCartContext()

  const addToCart = useCallback((product) => {
    add(product)
  }, [add])

  const removeFromCart = useCallback((id) => {
    remove(id)
  }, [remove])

  const decrementItem = useCallback((id) => {
    decrement(id)
  }, [decrement])

  return { items, addToCart, removeFromCart, decrementItem, clear, total, count }
}
