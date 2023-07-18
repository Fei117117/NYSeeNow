import { useEffect, useState, useMemo, useRef } from 'react'
import attractions_data from '../../assets/cleaned_attracions.json'
import { GoogleMap, MarkerF, HeatmapLayer} from '@react-google-maps/api'
import { HomePageMarker } from './HomePageMarker'
import { useCategories } from '../../context/CategoriesContext'
import options from '../../assets/attraction_options.json'
// This function should fetch the code from the backend instead of the json file.

export const HomePageMap = (props) => {
  // fetch_marker_data will be turned into a function call that can get all the attractions from the backend.

  const { selectedOptions, setSelectedOptions } = useCategories()

  const [fetched_markers, setFetchedMarkers] = useState([])

  const [mapLoaded, setMapLoaded] = useState(false) // New state for map loading

  const [heatmapData, setHeatmapData] = useState([]); // New state for heatmap data
  const [heatmapLayer, setHeatmapLayer] = useState(null); // New state for heatmap layer reference


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

  //use a use effect to set a new heatmap data when the selected options change
  useEffect(() => {
    const lat_lon = fetched_markers.map((marker) => marker.position.lat + ',' + marker.position.lng);
    const convertedData = lat_lon.map((position) => {
      const [lat, lng] = position.split(',');
      return new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng));
    });

    if (heatmapLayer) {
      heatmapLayer.setMap(null);
    }

    setHeatmapData(convertedData);
  }, [fetched_markers]);
  
  const handleHeatmapLoad = (heatmapLayer) => {
    // Handle the loaded heatmapLayer instance
    heatmapLayer.setOptions({
      radius: 20, // Set the radius of each data point
      opacity: 0.3, // Set the opacity of the heatmap layer
      //start at opaque, then green, yellow, red
      gradient:['rgba(255, 255, 255, 0)', 'green', 'yellow', 'red']
    });

    // Set the heatmap layer reference
    setHeatmapLayer(heatmapLayer);
  };

  const [zoomLevel, setZoomLevel] = useState(15) // Initial zoom level

  const mapRef = useRef(null)

  const handleMapLoading = () => {
    setMapLoaded(true)
  }

  const handleCenterChange = () => {
    setZoomLevel(25)
  }

  //console.log('Heat Map Array:',heatmapData);

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
        {mapLoaded && fetched_markers.map((marker_details, index) => (
          !props.isNowMode && <HomePageMarker key={index} markerDetails={marker_details} />
        ))}

        {mapLoaded && props.isNowMode &&
         <HeatmapLayer data={heatmapData} onLoad={handleHeatmapLoad}/>
        }

      </GoogleMap>
  )
}
