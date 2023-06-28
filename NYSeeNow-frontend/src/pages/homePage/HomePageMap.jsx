import { useEffect, useState, useMemo } from 'react'
import markerData from '../../assets/best_time_ok_data.json'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { HomePageMarker } from './HomePageMarker'

// This function should fetch the code from the backend instead of the json file.
function fetch_marker_data() {
  let coordinate_json = []
  for (let key in markerData) {
    if (markerData.hasOwnProperty(key)) {
      let marker = markerData[key]
      let coordinates_string = marker['Venue Coordinates']
      let position = coordinates_string.split(' ')
      let marker_coordinates = {
        position: { lat: parseFloat(position[0]), lng: parseFloat(position[1]) },
        name: marker['Venue Name']
      }
      coordinate_json.push(marker_coordinates)
    }
  }

  return coordinate_json
}

export const HomePageMap = () => {
  // fetch_marker_data will be turned into a function call that can get all the attractions from the backend.
  const fetched_markers = fetch_marker_data()

  const center_point = useMemo(() => ({ lat: 40.7484, lng: -73.9857 }), [])

  const [mapLoaded, setMapLoaded] = useState(false)

  const handleMapLoading = () => {
    setMapLoaded(true)
  }
  return (
    <GoogleMap
      mapContainerClassName="map-container"
      mapTypeId="roadmap"
      zoom={13}
      center={center_point}
      onLoad={handleMapLoading}
    >
      {mapLoaded &&
        fetched_markers.map((marker_details, index) => (
          <HomePageMarker key={index} markerDetails={marker_details} />
        ))}
    </GoogleMap>
  )
}
