import { useAuth } from '../../context/AuthContext'

export const HomePage = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  return (
    <>
      <h1>Home Page</h1>
      <h3>Currently: {isLoggedIn ? 'Logged In' : 'Loged out'}</h3>
    </>
  )
}
