import { useAuth } from '../../context/AuthContext'
import { AuthOverlay } from '../authOverlay/AuthOverlay'

export const MyItineraries = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  // Get the state, if login not done, show overlay. I login, render userprofile page just like that.

  if (isLoggedIn) {
    return <h1>My Itineraries</h1>
  } else {
    {
      return <AuthOverlay></AuthOverlay>
    }
  }
}
