import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ItineraryCarouselCard from './ItineraryCarouselCard'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './ItineraryBuilder.module.css'
import { useTripData } from '../../context/TripDataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const ItineraryBuilder = () => {
  const navigate = useNavigate()

  const [tripMap, setTripMap] = useState({})
  const { tripData, setTripData } = useTripData()
  const { authUser } = useAuth()

  useEffect(() => {
    setTripMap(tripData)
  }, [])

  const saveItinerary = () => {
    console.log('The request to save')

    let req_obj = { user: authUser }
    req_obj['tripDetails'] = tripMap
    console.log(req_obj)

    const req_string = JSON.stringify(req_obj)
    const save_url = '/trip/create'

    axios
      .post(save_url, req_string, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Saving Success!')
        console.log(response)
      })
      .catch((error) => {
        console.log('You have an error while saving!')
        console.log(error)
      })
    navigate('/itineraries')
  }

  return (
    <div>
      <h1>Itinerary Builder</h1>
      <Carousel
        className={styles.CarouselCard}
        showArrows={true}
        showThumbs={false}
        centerSlidePercentage={50}
      >
        {Object.entries(tripMap).map(([key, value]) => (
          <div className={styles.CarouselElement}>
            <ItineraryCarouselCard key={key} day={key} value={value}></ItineraryCarouselCard>
          </div>
        ))}
      </Carousel>
      <button onClick={saveItinerary}>Save Itinerary</button>
    </div>
  )
}
