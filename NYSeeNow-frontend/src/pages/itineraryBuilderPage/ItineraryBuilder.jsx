import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
//temporary fecthing of attractions from the file
import attractions_data from '../../assets/cleaned_attracions.json'
import ItineraryCarouselCard from './ItineraryCarouselCard'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './ItineraryBuilder.module.css'

export const ItineraryBuilder = () => {
  const [tripMap, setTripMap] = useState({})

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  useEffect(() => {
    let attraction_list = attractions_data['features']

    let trip_map_sample = {}

    for (let i = 0; i < 6; i++) {
      attraction_list[i].properties['day_busyness'] = [
        12, 34, 56, 78, 90, 34, 26, 77, 78, 34, 23, 45, 12, 34, 56, 78, 90, 34, 26, 77, 78, 34, 23,
        45
      ]
    }

    trip_map_sample[new Date(2023, 6, 15)] = [attraction_list[0], attraction_list[1]]
    trip_map_sample[new Date(2023, 6, 16)] = [attraction_list[2], attraction_list[3]]
    trip_map_sample[new Date(2023, 6, 17)] = [attraction_list[4], attraction_list[5]]
    console.log(attraction_list[0])
    setTripMap(trip_map_sample)
  }, [])

  const saveItinerary = () => {
    //store in context
    if (isLoggedIn) {
      //send Request
      //getResponse
      //move to next page
      //Go to saved
      //fetch the itineraries in useEffect there
      console.log(tripMap)
    } else {
      //move to next page
      //login
      //send request using context data
      //get response
      //render page by sending another request to fetch all the data
    }
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
