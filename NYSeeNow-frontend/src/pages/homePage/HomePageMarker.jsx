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

  const onLoad = (infoBox) => {}

  const options = { closeBoxURL: '', enableEventPropagation: false }

  return (
    <>
      <MarkerF
        position={props.markerDetails['position']}
        onMouseOver={handleMarkerHoveredIn}
        onClick={handleLocationClick}
      ></MarkerF>
      {hovered && (
        <InfoBox onLoad={onLoad} options={options} position={props.markerDetails['position']}>
          <MarkerHoverCard
            place={props.markerDetails}
            onClose={handleMarkerHoveredOut}
            markerInfo={props.markerDetails}
          ></MarkerHoverCard>
        </InfoBox>
      )}
    </>
  )
}
{
}
