import { MarkerF, InfoBox } from '@react-google-maps/api'
import { useState } from 'react'
import { MarkerHoverCard } from './MarkerHoverCard'

const getTypeColor = (type) => {
  const typeColorMap = {
    attraction: 'blue',
    museum: 'red',
    artwork: 'green',
    gallery: 'yellow',
    sightseeing: 'purple',
    aquarium: 'cyan',
    camp_site: 'magenta',
    view_point: 'orange'
    // Add other types and colors as needed
  }

  return typeColorMap[type] || 'gray' // gray will be the default color if the type is not found
}

export const HomePageMarker = (props) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleMarkerHoveredIn = () => {
    setIsHovered(true)
  }

  const handleMarkerHoveredOut = () => {
    if (!isClicked) {
      setIsHovered(false)
    }
  }

  const handleMarkerClicked = () => {
    setIsClicked(true)
  }

  const handleCardClose = () => {
    setIsClicked(false)
    setIsHovered(false)
  }

  const onLoad = (infoBox) => {}

  const options = { closeBoxURL: '', enableEventPropagation: true }

  const icon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: getTypeColor(props.markerDetails.tourism),
    fillOpacity: 1,
    strokeColor: 'black',
    strokeWeight: 1,
    scale: 10 // Increase this number to make the SVG larger
  }

  return (
    <>
      <MarkerF
        position={props.markerDetails['position']}
        onMouseOver={handleMarkerHoveredIn}
        onClick={handleMarkerClicked}
        icon={icon}
      ></MarkerF>
      {(isHovered || isClicked) && (
        <InfoBox onLoad={onLoad} options={options} position={props.markerDetails['position']}>
          <MarkerHoverCard
            place={props.markerDetails}
            onClose={handleCardClose}
            markerInfo={props.markerDetails}
            onMouseOut={handleMarkerHoveredOut}
          ></MarkerHoverCard>
        </InfoBox>
      )}
    </>
  )
}
