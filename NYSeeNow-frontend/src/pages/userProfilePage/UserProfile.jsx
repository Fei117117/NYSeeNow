import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { AuthOverlay } from '../authOverlay/AuthOverlay'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'


export const UserProfile = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  const [email, setEmail] = useState('')


  useEffect(() => {
    axios.get(`/api/users/${authUser}`)  // replace this with your API endpoint
        .then(response => setEmail(response.data.email))
        .catch(error => console.error('Error fetching user data:', error))
  }, [authUser])

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
        <p>Username: {authUser}</p>
        <p>Email: {email}</p>
        <button onClick={logoutHandler}>Logout</button>
      </>
    )
  } else {
    {
      return <AuthOverlay></AuthOverlay>
    }
  }
}
