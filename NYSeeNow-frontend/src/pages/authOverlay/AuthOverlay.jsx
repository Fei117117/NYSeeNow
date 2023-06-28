import React, { useEffect, useState } from 'react'
import { Login } from './Login'
import { Register } from './Register'
export const AuthOverlay = (props) => {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return currentForm === 'login' ? (
      // Passing functions as props
      <Login onFormSwitch={toggleForm} />
  ) : (
      <Register onFormSwitch={toggleForm} />
  )
}