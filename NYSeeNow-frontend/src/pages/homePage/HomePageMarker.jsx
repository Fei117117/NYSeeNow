import { MarkerF, InfoBox } from '@react-google-maps/api'
import { useState } from 'react'
import { MarkerHoverCard } from './MarkerHoverCard'

export const HomePageMarker = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMarkerHoveredIn = () => {
    setIsHovered(true);
  }

  const handleMarkerHoveredOut = () => {
    if (!isClicked) {
      setIsHovered(false);
    }
  }

  const handleMarkerClicked = () => {
    setIsClicked(true);
  }

  const handleCardClose = () => {
    setIsClicked(false);
    setIsHovered(false);
  }

  const onLoad = (infoBox) => {}

  const options = { closeBoxURL: '', enableEventPropagation: true }

  return (
    <>
      <MarkerF
        position={props.markerDetails['position']}
        onMouseOver={handleMarkerHoveredIn}
        onMouseOut={handleMarkerHoveredOut}
        onClick={handleMarkerClicked}
      ></MarkerF>
      {(isHovered || isClicked) && (
        <InfoBox onLoad={onLoad} options={options} position={props.markerDetails['position']}>
          <MarkerHoverCard
            place={props.markerDetails}
            onClose={handleCardClose}
            markerInfo={props.markerDetails}
          ></MarkerHoverCard>
        </InfoBox>
      )}
    </>
  )
}
