import { useEffect, useState } from 'react'
import { useSelection } from '../../context/SelectionContext'

export const MarkerHoverCard = (props) => {
  const { selectedList, setSelectedList } = useSelection()
  const [imageUrl, setImageUrl] = useState(null)

  const add_attraction = () => {
    console.log('PLACE:', props.place) // Add this line to inspect the properties of a place
    const attractionWithImage = { ...props.place, imgUrl: imageUrl }

    if (selectedList == null) {
      setSelectedList([attractionWithImage])
    } else {
      setSelectedList([...selectedList, attractionWithImage])
    }
  }

  const fetchImage = async (placeName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${placeName}&client_id=aqKawDJQSON-VdRqYv7Go4eY44nlRSflcZsgIveDcIU`
      )

      // Add this to check the response status
      console.log(`Response status: ${response.status}`)

      const responseJson = await response.json()

      // Log the entire response as well
      console.log('Response:', responseJson)

      if (responseJson && responseJson.results && responseJson.results.length > 0) {
        setImageUrl(responseJson.results[0].urls.small)
      } else {
        console.error(`No image found for ${placeName}`)
      }
    } catch (error) {
      console.error(`Failed to fetch image for ${placeName}`, error)
    }
  }

  useEffect(() => {
    fetchImage(props.place['name'])
  }, [props.place])

  return (
    <div className="hover-card-container" onMouseLeave={props.onClose}>
      {/* Display the image if available */}
      {imageUrl && (
        <div className="hover-card-image">
          <img src={imageUrl} alt={props.place['name']} />
        </div>
      )}
      <div className="hover-card-info">
        <h3>{props.place['name']}</h3>
        <button onClick={add_attraction}>Add to itinerary</button>
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  )
}
