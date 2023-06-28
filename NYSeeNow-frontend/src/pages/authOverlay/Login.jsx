import React, { useEffect, useState } from 'react'
import './Login.css'
import fetch from 'isomorphic-fetch'
import { post } from '../../net/net'
import { useAuth } from '../../context/AuthContext'

export const Login = (props) => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [remember, setRemember] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      username: username,
      password: pass,
      remember: remember
    }

    const url = 'api/auth/login'

    post(
      url,
      data,
      (message, status) => {
        console.log('Success:', message)
        console.log('Status:', status)
        setMessage('Login successful!')
        setAuthUser(username)
        setIsLoggedIn(true)
      },
      (message, status) => {
        console.log('Failure:', message)
        console.log('Status:', status)
        setMessage('Login failed. Please try again.')
      },
      (error) => {
        console.error('Error:', error)
        setMessage('An error occurred. Please try again later.')
      }
    )
  }

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          id="username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button>Login</button>
        <div className="remember-checkbox">
          {' '}
          {/* checkbox container */}
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            id="remember"
          />
          <label htmlFor="remember">Remember</label>
        </div>
        {message && <p className="message">{message}</p>} {/* Display message if it exists */}
      </form>
      <button onClick={() => props.onFormSwitch('register')}>
        Don't have an account? Register here.{' '}
      </button>
    </div>
  )
}