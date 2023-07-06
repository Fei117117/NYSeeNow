import { MarkerF, InfoBox } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { MarkerHoverCard } from './MarkerHoverCard'

export const HomePageMarker = (props) => {
  useEffect(() => {})
  const [hovered, setHovered] = useState(false)

  const handleMarkerHoveredIn = () => {
    setHovered(true)
  }

  const handleMarkerHoveredOut = () => {
    setHovered(false)
  }

  const handleLocationClick = () => {
    console.log('location clicked')
  }

  const onLoad = (infoBox) => {
    console.log('infoBox: ', infoBox)
  }

  const options = { closeBoxURL: '', enableEventPropagation: true }

  return (
    <>
      <MarkerF
        position={props.markerDetails['position']}
        onMouseOver={handleMarkerHoveredIn}
        onMouseUp={handleMarkerHoveredOut}
        onClick={handleLocationClick}
      ></MarkerF>
      {hovered && (
        <InfoBox onLoad={onLoad} options={options} position={props.markerDetails['position']}>
          <MarkerHoverCard
            place_name={props.markerDetails['name']}
            onClose={handleMarkerHoveredOut}
          ></MarkerHoverCard>
        </InfoBox>
      )}
    </>
  )
}
{
}
