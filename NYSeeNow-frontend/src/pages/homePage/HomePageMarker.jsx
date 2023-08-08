import { InfoBox, OverlayView } from '@react-google-maps/api';
import { useEffect, useState } from 'react'
import { MarkerHoverCard } from './MarkerHoverCard'

const attractionSVG = "/attractions.svg";
const museumSVG = "/museums.svg";
const artworkSVG = "/artworks.svg";
const aquariumSVG = "/aquariums.svg";
const campsiteSVG = "/campsites.svg";
const gallerySVG = "/galleries.svg";
const sightseeingSVG = "/sightseeing.svg";

const getCustomMarker = (type) => {
  const color = getTypeColor(type);
  const svgIcon = {
    attraction: attractionSVG,
    museum: museumSVG,
    artwork: artworkSVG,
    aquarium: aquariumSVG,
    camp_site: campsiteSVG,
    gallery: gallerySVG,
    sightseeing: sightseeingSVG
  }[type] || attractionSVG;

  return `
    <div style="background-color: ${color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
      <img src="${svgIcon}" style="width: 30px; height: 30px;" />
    </div>
  `;
}



export const getTypeColor = (type) => {
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

  return typeColorMap[type] || 'blue' // blue will be the default color if the type is not found
}

const getTypeIconURL = (type) => {
  const color = getTypeColor(type);
  const svgIcon = {
    attraction: attractionSVG,
    museum: museumSVG,
    artwork: artworkSVG,
    aquarium: aquariumSVG,
    camp_site: campsiteSVG,
    gallery: gallerySVG,
    sightseeing: sightseeingSVG
  }[type] || attractionSVG;

  // Create an SVG string with a colored circle and the attraction SVG as its background
  const svgString = `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="${color}" stroke="black" stroke-width="1"/>
      <image href="${svgIcon}" x="5" y="5" height="30" width="30"/>
    </svg>
  `;

  // Convert the SVG string to a data URL
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}



export const HomePageMarker = (props) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)


  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        handleMarkerHoveredOut()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isHovered])

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

  const onLoad = (infoBox) => { }

  const options = { closeBoxURL: '', enableEventPropagation: true }

  const icon = {
    url: getTypeIconURL(props.markerDetails.tourism),
    scaledSize: new google.maps.Size(40, 40)
  };



  return (
    <>
      <OverlayView
        position={props.markerDetails['position']}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div
          dangerouslySetInnerHTML={{ __html: getCustomMarker(props.markerDetails.tourism) }}
          onMouseOver={handleMarkerHoveredIn}
          onClick={handleMarkerClicked}
        />
      </OverlayView>

      {(isHovered || isClicked) && (
        <InfoBox onLoad={onLoad} options={options} position={props.markerDetails['position']}>
          <MarkerHoverCard
            place={props.markerDetails}
            onClose={handleCardClose}
            markerInfo={props.markerDetails}
            onMouseOut={handleMarkerHoveredOut}
            isHovered={isHovered}
          ></MarkerHoverCard>
        </InfoBox>
      )}
    </>
  );
}
