import { useEffect, useState, useMemo, useRef } from 'react'

import attractions_data from '../../assets/cleaned_attracions.json'

import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { HomePageMarker } from './HomePageMarker'
import { useCategories } from '../../context/CategoriesContext'
import options from '../../assets/attraction_options.json'
// This function should fetch the code from the backend instead of the json file.

export const HomePageMap = (props) => {
  // fetch_marker_data will be turned into a function call that can get all the attractions from the backend.

  const { selectedOptions, setSelectedOptions } = useCategories()

  const [fetched_markers, setFetchedMarkers] = useState([])

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

  function fetch_marker_data() {
    let filtered_types = getSelectedTypes()
    let attraction_list = attractions_data['features']

    let coordinate_json = []
    for (let key in attraction_list) {
      if (attraction_list.hasOwnProperty(key)) {
        let attraction_details = attraction_list[key]
        let position_cords = attraction_details['geometry']['coordinates']
        let marker_coordinates = {
          position: { lat: position_cords[1], lng: position_cords[0] },
          name: attraction_details['properties']['name'],
          type: attraction_details['properties']['tourism'],
          all_details: attraction_details
        }
        if (filtered_types.includes(marker_coordinates['type']))
          coordinate_json.push(marker_coordinates)
      }
    }

    return coordinate_json
  }

  useEffect(() => {
    setFetchedMarkers(fetch_marker_data())
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
        fetched_markers.map((marker_details, index) => (
          <HomePageMarker key={index} markerDetails={marker_details} />
        ))}
    </GoogleMap>
  )
}
