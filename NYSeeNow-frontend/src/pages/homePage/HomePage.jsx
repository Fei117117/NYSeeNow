import { useAuth } from '../../context/AuthContext'

import { useEffect } from 'react'

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

export const HomePage = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCTCIyYHCeWx1duTYP38_g8ikK3_fwVrSE'
  })

  if (!isLoaded) {
    return <h1>Map loading</h1>
  } else {
    return <Map />
  }
}

function Map() {
  return (
    <GoogleMap
      mapContainerClassName="map-container"
      mapTypeId="roadmap"
      zoom={9}
      center={{ lat: 40.7484, lng: -73.9857 }}
    ></GoogleMap>
  )
}
