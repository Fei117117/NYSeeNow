import { HomePageMap } from './HomePageMap'

import { useLoadScript } from '@react-google-maps/api'

export const HomePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCTCIyYHCeWx1duTYP38_g8ikK3_fwVrSE'
  })

  if (!isLoaded) {
    return <h1>Map loading...</h1>
  } else {
    return <HomePageMap></HomePageMap>
  }
}
