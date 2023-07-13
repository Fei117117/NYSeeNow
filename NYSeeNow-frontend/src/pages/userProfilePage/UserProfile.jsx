import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { AuthOverlay } from '../authOverlay/AuthOverlay'

export const UserProfile = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }
  // Get the state, if login not done, show overlay. I login, render userprofile page just like that.

  if (isLoggedIn) {
    return <h1>My UserProfile</h1>
  } else {
    {
      return <AuthOverlay></AuthOverlay>
    }
  }
}
