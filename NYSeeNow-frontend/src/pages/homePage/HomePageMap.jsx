import { useEffect, useState, useMemo, useRef } from 'react'
import attractions_data from '../../assets/filtered_attractions.json'
import { GoogleMap, MarkerF, HeatmapLayer } from '@react-google-maps/api'
import { HomePageMarker } from './HomePageMarker'
import { useCategories } from '../../context/CategoriesContext'
import options from '../../assets/attraction_options.json'
import axios from 'axios'
// This function should fetch the code from the backend instead of the json file.

export const HomePageMap = (props) => {
  // fetch_marker_data will be turned into a function call that can get all the attractions from the backend.

  const { selectedOptions, setSelectedOptions } = useCategories()

  const [fetched_markers, setFetchedMarkers] = useState([])

  const [mapLoaded, setMapLoaded] = useState(false) // New state for map loading

  const [heatmapData, setHeatmapData] = useState([]) // Declare heatmapData state variable

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
        setFetchedMarkers(coordinate_json)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [selectedOptions])

  //useeffect to set new heatmap data when the selected options change
  //the weight here will be the busyness percentage we get from backend
  // Note that museums and artworks do not load on the map I can not figure out why, they are passed correctly
  // and with a busyness value
  // ... Other parts of the code

  useEffect(() => {
    const fetchData = async () => {
      const lat_lon = fetched_markers.map(
        (marker) => marker.position.lat + ',' + marker.position.lng
      )

      const heatmapData = await Promise.all(
        lat_lon.map(async (position) => {
          const [lat, lng] = position.split(',')

          try {
            const requestBody = {
              name: fetched_markers.find(
                (marker) => marker.position.lat + ',' + marker.position.lng === position
              )?.name,
              lat_lon: position,
              hour: new Date().getHours(),
              day: new Date().getDay(),
              month: new Date().getMonth() + 1
            }

            const response = await axios.post('attraction/predict', requestBody)

            const data = response.data
            const busyness = data.busyness
            const info = {
              name: fetched_markers.find(
                (marker) => marker.position.lat + ',' + marker.position.lng === position
              )?.name,
              lat_lon: position,
              hour: new Date().getHours(),
              day: new Date().getDay(),
              month: new Date().getMonth(),
              busyness: busyness
            }

            return {
              location: new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
              weight: busyness
            }
          } catch (error) {
            console.error('Error fetching busyness data:', error)
            return null
          }
        })
      )

      setHeatmapData(heatmapData.filter((entry) => entry !== null))
    }

    fetchData()
  }, [fetched_markers])

  // ... Other parts of the code

  const handleHeatmapLoad = (heatmapLayer) => {
    // Handle the loaded heatmapLayer instance
    //define the gradient, opaque, green, yellow, red
    const gradient = [
      'rgba(255, 255, 255, 0)',
      'rgba(0, 255, 0, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(255, 0, 0, 1)'
    ]

    heatmapLayer.setOptions({
      radius: 20, //Set the radius of each data point
      opacity: 0.3, // Set the opacity of the heatmap layer
      //start at opaque, then green, yellow, red
      gradient
    })
  }

  const [zoomLevel, setZoomLevel] = useState(15) // Initial zoom level

  const mapRef = useRef(null)

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
        fetched_markers.map(
          (marker_details, index) =>
            !props.isNowMode && <HomePageMarker key={index} markerDetails={marker_details} />
        )}

      {props.isNowMode && <HeatmapLayer data={heatmapData} onLoad={handleHeatmapLoad} />}
    </GoogleMap>
  )
}
