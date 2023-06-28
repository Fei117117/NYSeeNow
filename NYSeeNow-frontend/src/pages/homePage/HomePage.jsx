import { useAuth } from '../../context/AuthContext'

import { useEffect, useState, useMemo } from 'react'

import markerData from '../../assets/best_time_ok_data.json'

import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'

function fetch_marker_data() {
  let coordinate_json = []
  for (let key in markerData) {
    if (markerData.hasOwnProperty(key)) {
      let marker = markerData[key]
      let coordinates_string = marker['Venue Coordinates']
      let position = coordinates_string.split(' ')
      let marker_coordinates = {
        lat: parseFloat(position[0]),
        lng: parseFloat(position[1])
      }
      coordinate_json.push(marker_coordinates)
    }
  }

  return coordinate_json
}

export const HomePage = () => {
  const fetched_positions_array = fetch_marker_data()

  const center_point = useMemo(() => ({ lat: 40.7484, lng: -73.9857 }), [])

  const [mapLoaded, setMapLoaded] = useState(false)

  const handleMapLoading = () => {
    setMapLoaded(true)
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCTCIyYHCeWx1duTYP38_g8ikK3_fwVrSE'
  })

  if (!isLoaded) {
    return <h1>Map loading</h1>
  } else {
    return (
      <GoogleMap
        mapContainerClassName="map-container"
        mapTypeId="roadmap"
        zoom={15}
        center={center_point}
        onLoad={handleMapLoading}
      >
        {mapLoaded &&
          fetched_positions_array.map((point, index) => <MarkerF key={index} position={point} />)}
      </GoogleMap>
    )
  }
}

function Map() {
  const fetched_positions_array = fetch_marker_data()

  const center_point = useMemo(() => ({ lat: 40.7484, lng: -73.9857 }), [])
  return (
    <GoogleMap
      mapContainerClassName="map-container"
      mapTypeId="roadmap"
      zoom={15}
      center={center_point}
    >
      {fetched_positions_array.map((point, index) => (
        <Marker key={index} position={point} />
      ))}
    </GoogleMap>
  )
}
