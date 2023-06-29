import { MarkerF } from '@react-google-maps/api'
import { useState } from 'react'

export const HomePageMarker = (props) => {
  const [hovered, setHovered] = useState(false)

  const handleMarkerHoveredIn = () => {
    setHovered(true)
  }

  const handleMarkerHoveredOut = () => {
    setHovered(false)
  }

  return (
    <MarkerF
      position={props.markerDetails['position']}
      onMouseOver={handleMarkerHoveredIn}
      onMouseOut={handleMarkerHoveredOut}
    ></MarkerF>
  )
}
