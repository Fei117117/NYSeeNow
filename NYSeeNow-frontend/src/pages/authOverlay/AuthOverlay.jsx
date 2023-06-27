import React, { useEffect, useState } from 'react'

const [currentForm, setCurrentForm] = useState('login')

const toggleForm = (formName) => {
  setCurrentForm(formName)
}

{
  currentForm === 'login' ? (
    // Passing functions as props
    <Login onFormSwitch={toggleForm} />
  ) : (
    <Register onFormSwitch={toggleForm} />
  )
}

export const AuthOverlay = (props) => {
  return currentForm
}
