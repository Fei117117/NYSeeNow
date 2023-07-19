import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { AuthOverlay } from '../authOverlay/AuthOverlay'
import { useNavigate } from 'react-router-dom'

export const UserProfile = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }
  // Get the state, if login not done, show overlay. I login, render userprofile page just like that.
  const navigate = useNavigate()
  const logoutHandler = () => {
    setIsLoggedIn(false)
    navigate('/')
  }
  if (isLoggedIn) {
    return (
      <>
        <h1>My UserProfile</h1>
        <button onClick={logoutHandler}>Logout</button>
      </>
    )
  } else {
    {
      return <AuthOverlay></AuthOverlay>
    }
  }
}
