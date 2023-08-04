import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import { AuthOverlay } from '../authOverlay/AuthOverlay'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { differenceInDays } from 'date-fns'
import styles from './UserProfile.module.css'

export const UserProfile = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState(null)
  const [selectedTab, setSelectedTab] = useState('My Profile')

  useEffect(() => {
    axios.get(`/api/users/${authUser}`)
      .then(response => {
        setEmail(response.data.email)
        setCreatedAt(new Date(response.data.createdAt)) // Parse the date from the response
      })
      .catch(error => console.error('Error fetching user data:', error))
  }, [authUser])

  const navigate = useNavigate()

  const timeRegistered = createdAt
    ? `${differenceInDays(new Date(), createdAt)} days ago`
    : ''

  const logoutHandler = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'My Profile':
        return (
          <>
            <p>Username: {authUser}</p>
            <p>Email: {email}</p>
            <p>Registered: {timeRegistered}</p>
          </>
        )
      case 'Saved Itineraries':
        return <div>Saved Itineraries content goes here</div>
      case 'Favorites':
        return <div>Favorites content goes here</div>
      case 'Settings':
        return <div>Settings content goes here</div>
      default:
        return <div>Select a tab</div>
    }
  }

  if (isLoggedIn) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>{selectedTab}</h2>
          </div>
          <div className={styles.sidebar}>
            <button onClick={() => setSelectedTab('My Profile')}>My Profile</button>
            <button onClick={() => setSelectedTab('Saved Itineraries')}>Saved Itineraries</button>
            <button onClick={() => setSelectedTab('Favorites')}>Favorites</button>
            <button onClick={() => setSelectedTab('Settings')}>Settings</button>
            <button onClick={logoutHandler}>Logout</button>
          </div>
          <div className={styles.content}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    )
  } else {
    return <AuthOverlay></AuthOverlay>
  }
}
