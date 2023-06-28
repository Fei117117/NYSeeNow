import React, { useState } from 'react'
import { Login } from './Login'
import { Register } from './Register'
import { ResetPassword } from './Reset'

export const AuthOverlay = (props) => {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  switch (currentForm) {
    case 'login':
      return <Login onFormSwitch={toggleForm} />
    case 'register':
      return <Register onFormSwitch={toggleForm} />
    case 'reset':
      return <ResetPassword onFormSwitch={toggleForm} />
    default:
      return null;
  }
}
