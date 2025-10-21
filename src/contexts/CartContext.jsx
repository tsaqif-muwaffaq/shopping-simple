import React, { createContext, useReducer, useContext, useMemo } from 'react'

const CartContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        }
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)
      }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  const add = (item) => dispatch({ type: 'ADD', item })
  const remove = (id) => dispatch({ type: 'REMOVE', id })
  const decrement = (id) => dispatch({ type: 'DECREMENT', id })
  const clear = () => dispatch({ type: 'CLEAR' })

  const total = useMemo(() => {
    return state.items.reduce((s, it) => s + it.price * it.qty, 0)
  }, [state.items])

  const count = useMemo(() => state.items.reduce((s, it) => s + it.qty, 0), [state.items])

  const value = { items: state.items, add, remove, decrement, clear, total, count }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  return useContext(CartContext)
}
