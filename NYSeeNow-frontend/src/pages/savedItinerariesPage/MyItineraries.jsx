import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { AuthOverlay } from '../authOverlay/AuthOverlay'
import axios from 'axios'
import { TripContainer } from './TripContainer'
import styles from './MyItineraries.module.css'

export const MyItineraries = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()
  const [myTrips, setMyTrips] = useState(null)
  const trips_url = `/trip/${authUser}`

  useEffect(() => {
    axios
      .get(trips_url)
      .then((response) => {
        console.log('Got all the trips!')
        console.log(response)
        setMyTrips(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [isLoggedIn])

  console.log('Is logged in ? ')
  console.log(isLoggedIn)
  console.log('My Trips')
  console.log(myTrips)

  return (
    <div>
      {isLoggedIn && myTrips && (
        <div>
          {' '}
          <h2>Upcoming Trips</h2>
          {Object.entries(myTrips).map(([key, value]) => (
            <div className={styles.tripPage}>
              <TripContainer
                key={key}
                trip_details={key}
                attraction_details={value}
              ></TripContainer>
            </div>
          ))}
        </div>
      )}
      {!isLoggedIn && <AuthOverlay></AuthOverlay>}
    </div>
  )
}
