import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Ganti 'admin' dan 'password123' dengan username & password yang Anda inginkan
  const login = (username, password) => {
    if (username === 'tsaqif' && password === '1234') {
      setUser({ name: username })
      return true
    }
    setUser(null)
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
