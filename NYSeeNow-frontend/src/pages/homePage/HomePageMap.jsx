import { useEffect, useState, useMemo, useRef } from 'react'

import attractions_data from '../../assets/cleaned_attracions.json'

import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { HomePageMarker } from './HomePageMarker'
import { useCategories } from '../../context/CategoriesContext'
import options from '../../assets/attraction_options.json'
import axios from 'axios'
// This function should fetch the code from the backend instead of the json file.

export const HomePageMap = (props) => {
  // fetch_marker_data will be turned into a function call that can get all the attractions from the backend.

  const { selectedOptions, setSelectedOptions } = useCategories()

  const [fetched_markers, setFetchedMarkers] = useState(null)

  const getSelectedTypes = () => {
    let filtered_options = options
    let filtered_types = []
    if (selectedOptions.length > 0) {
      filtered_options = options.filter((option) => selectedOptions.includes(option.id))
    }

    filtered_options.map((option) => {
      filtered_types = filtered_types.concat(option['types'])
    })
    return filtered_types
  }

  let attraction_url = '/attractions/fetch'
  let filtered_types = getSelectedTypes()
  let attractions = null
  let coordinate_json = []
  useEffect(() => {
    axios
      .get(attraction_url)
      .then((response) => {
        attractions = response.data
        attractions.map((attraction, key) => {
          attraction['position'] = { lat: attraction.latitude, lng: attraction.longitude }
        })
        for (let key in attractions) {
          if (attractions.hasOwnProperty(key)) {
            let attraction_details = attractions[key]
            if (filtered_types.includes(attraction_details['tourism']))
              coordinate_json.push(attraction_details)
          }
        }
        setMapLoaded(true)
        console.log('Letss goooo')
        console.log(coordinate_json)
        setFetchedMarkers(coordinate_json)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [selectedOptions])

  const [zoomLevel, setZoomLevel] = useState(15) // Initial zoom level

  const mapRef = useRef(null)

  const [mapLoaded, setMapLoaded] = useState(false)

  const handleMapLoading = () => {
    setMapLoaded(true)
  }

  const handleCenterChange = () => {
    setZoomLevel(25)
  }

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      ref={mapRef}
      mapTypeId="roadmap"
      zoom={zoomLevel}
      center={props.map_center}
      onLoad={handleMapLoading}
      onCenterChanged={handleCenterChange}
    >
      {mapLoaded &&
        fetched_markers &&
        fetched_markers.map((marker_details, index) => (
          <HomePageMarker key={index} markerDetails={marker_details} />
        ))}
    </GoogleMap>
  )
}
