import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
//temporary fecthing of attractions from the file
import attractions_data from '../../assets/cleaned_attracions.json'
import ItineraryCarouselCard from './ItineraryCarouselCard'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './ItineraryBuilder.module.css'
import { useTripData } from '../../context/TripDataContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ItineraryBuilder = () => {
  const [tripMap, setTripMap] = useState({})
  const { tripData, setTripData } = useTripData()

  const navigate = useNavigate()

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  useEffect(() => {
    setTripMap(tripData)
  }, [])

  const saveItinerary = () => {
    console.log('The request to save')
    let req_obj = { user: authUser }
    req_obj['tripDetails'] = tripMap
    console.log(req_obj)

    const save_url = 'trip/create'

    const req_string = JSON.stringify(req_obj)

    axios
      .post(save_url, req_string, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Saving Success!')
        console.log(response)
        navigate('/itineraries')
      })
      .catch((error) => {
        console.log('You have an error while saving!')
        console.log(error)
      })
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

//I will pass the key to one component (should have previous and next buttons)
//I will pass the array to another component

//response processing
//create an array
// array = ['16 july' , '17 july' , '18 july']
// map = {}
// for arr in aerray:
// map[16 july]: []
// map {'16 july': [att2 ,att4 ]} //day_busyness: [23,56,67....]
