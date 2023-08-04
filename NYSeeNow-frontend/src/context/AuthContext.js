import React, { useState, useContext, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Load any saved login state from local storage when the component mounts
  useEffect(() => {
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

    if (storedIsLoggedIn) {
      setIsLoggedIn(storedIsLoggedIn)
    }
  }, [])

  // Save the login state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  }

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
