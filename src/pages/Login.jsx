import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/products'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) return alert('Please enter username and password')
    const success = login(username, password)
    if (success) {
      navigate(from, { replace: true })
    } else {
      alert('Invalid username or password')
    }
  }

  return (
    <div className="center-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Your name" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  )
}
