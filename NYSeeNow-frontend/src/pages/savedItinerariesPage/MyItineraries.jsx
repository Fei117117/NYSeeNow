import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { AuthOverlay } from '../authOverlay/AuthOverlay'
import axios from 'axios'
import { TripContainer } from './TripContainer'

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
  }, [])

  return (
    <div>
      <h2>Upcoming Trips</h2>
      {isLoggedIn &&
        myTrips &&
        Object.entries(myTrips).map(([key, value]) => (
          <div>
            <TripContainer key={key} trip_details={key} attraction_details={value}></TripContainer>
          </div>
        ))}
    </div>
  )
}
