import { useAuth } from '../../context/AuthContext'
import { Login } from '../authOverlay/Login'

export const UserProfile = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  // Get the state, if login not done, show overlay. I login, render userprofile page just like that.
  if (isLoggedIn) {
    return <h1>My UserProfile</h1>
  } else {
    return <Login></Login>
  }
}
