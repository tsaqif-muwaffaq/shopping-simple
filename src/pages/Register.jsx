import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username || !password) {
      return alert('Please fill in all fields')
    }
    // Simulasi pendaftaran
    alert('Registration successful! Please log in with your new account.')
    navigate('/login')
  }

  return (
    <div className="center-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="form">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  )
}