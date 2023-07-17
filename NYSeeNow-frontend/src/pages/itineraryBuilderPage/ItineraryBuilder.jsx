import { useEffect, useState } from 'react'
//temporary fecthing of attractions from the file
import attractions_data from '../../assets/cleaned_attracions.json'
import ItineraryCarouselCard from './ItineraryCarouselCard'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './ItineraryBuilder.module.css'

export const ItineraryBuilder = () => {
  const [tripMap, setTripMap] = useState({})

  useEffect(() => {
    let attraction_list = attractions_data['features']
    let trip_map_sample = {}
    trip_map_sample[new Date(2023, 6, 15)] = [attraction_list[0], attraction_list[1]]
    trip_map_sample[new Date(2023, 6, 16)] = [attraction_list[2], attraction_list[3]]
    trip_map_sample[new Date(2023, 6, 17)] = [attraction_list[4], attraction_list[5]]
    console.log('Inside IB useeffect.')
    setTripMap(trip_map_sample)
  }, [])

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
    </div>
  )
}

//I will pass the key to one component (should have previous and next buttons)
//I will pass the array to another component
