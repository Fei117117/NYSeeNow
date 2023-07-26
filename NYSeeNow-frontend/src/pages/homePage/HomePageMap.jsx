import { useEffect, useState, useMemo, useRef } from 'react'
import attractions_data from '../../assets/filtered_attractions.json'
import { GoogleMap, MarkerF, HeatmapLayer, Polyline } from '@react-google-maps/api';
import { HomePageMarker } from './HomePageMarker'
import { useCategories } from '../../context/CategoriesContext'
import options from '../../assets/attraction_options.json'
import axios from "axios";
// This function should fetch the code from the backend instead of the json file.

export const HomePageMap = (props) => {
  // fetch_marker_data will be turned into a function call that can get all the attractions from the backend.

  const { selectedOptions, setSelectedOptions } = useCategories()

  const [fetched_markers, setFetchedMarkers] = useState([])

  const [mapLoaded, setMapLoaded] = useState(false) // New state for map loading

  const [heatmapData, setHeatmapData] = useState([]); // Declare heatmapData state variable

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
    console.log(fetch_marker_data()); // Log out fetched_markers
  }, [selectedOptions])


  //useeffect to set new heatmap data when the selected options change
  //the weight here will be the busyness percentage we get from backend
  // Note that museums and artworks do not load on the map I can not figure out why, they are passed correctly
  // and with a busyness value
  // ... Other parts of the code

  useEffect(() => {
    const fetchData = async () => {
      const lat_lon = fetched_markers.map((marker) => marker.position.lat + ',' + marker.position.lng);

      const heatmapData = await Promise.all(
        lat_lon.map(async (position) => {
          const [lat, lng] = position.split(',');

          try {
            const requestBody = {
              name: fetched_markers.find((marker) => marker.position.lat + ',' + marker.position.lng === position)?.name,
              lat_lon: position,
              hour: new Date().getHours(),
              day: new Date().getDay(),
              month: new Date().getMonth() + 1,
            };

            const response = await axios.post('attraction/predict', requestBody);

            const data = response.data;
            const busyness = data.busyness;
            const info = {
              name: fetched_markers.find((marker) => marker.position.lat + ',' + marker.position.lng === position)?.name,
              lat_lon: position,
              hour: new Date().getHours(),
              day: new Date().getDay(),
              month: new Date().getMonth(),
              busyness: busyness,
            };

            console.log('info', info);

            return { location: new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng)), weight: busyness };
          } catch (error) {
            console.error('Error fetching busyness data:', error);
            return null;
          }
        })
      );

      setHeatmapData(heatmapData.filter((entry) => entry !== null));
      console.log(heatmapData); // Log out heatmapData
    };

    fetchData();
  }, [fetched_markers]);

  // ... Other parts of the code


  const handleHeatmapLoad = (heatmapLayer) => {
    // Handle the loaded heatmapLayer instance
    //define the gradient, opaque, green, yellow, red
    const gradient = [
      'rgba(255, 255, 255, 0)',
      'rgba(0, 255, 0, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(255, 0, 0, 1)'
    ];

    heatmapLayer.setOptions({
      radius: 20, //Set the radius of each data point
      opacity: 0.3, // Set the opacity of the heatmap layer
      //start at opaque, then green, yellow, red
      gradient
    });

  };

  const [zoomLevel, setZoomLevel] = useState(15) // Initial zoom level

  const mapRef = useRef(null)

  const handleMapLoading = () => {
    setMapLoaded(true)
  }

  // Notice we now also handle zoom from the props if it is provided
  const handleCenterChange = () => {
    if (props.zoom) {
      setZoomLevel(props.zoom);
    } else {
      setZoomLevel(25);
    }
  }

  // If the path has data, prepare it for the polyline
  const polylinePath = props.path.length > 0 ? props.path.map(location => ({ lat: location.lat, lng: location.lng })) : [];

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
      {props.path.length > 0 && (
        <Polyline
          path={polylinePath}
          options={{ strokeColor: "#FF0000 " }}
        />
      )}

      {mapLoaded && fetched_markers.map((marker_details, index) => (
        !props.isNowMode && <HomePageMarker key={index} markerDetails={marker_details} />
      ))}

      {props.isNowMode && (
        <HeatmapLayer data={heatmapData} onLoad={handleHeatmapLoad} />
      )}
    </GoogleMap>
  )
}