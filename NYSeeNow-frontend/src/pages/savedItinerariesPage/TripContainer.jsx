import { useEffect, useState } from 'react'
import styles from './TripContainer.module.css'

export const TripContainer = (props) => {
  const [tripObj, setTripObj] = useState(null)
  useEffect(() => {
    const trip_detail_string = props.trip_details
    setTripObj(JSON.parse(trip_detail_string))
  }, [])

  if (tripObj) {
    return (
      <div className={styles.tripContainer}>
        <div>Trip Id: {tripObj['trip_id']}</div>
        <div>Number of Attractions: {tripObj['number_of_attractions']}</div>
        <div>Start Date: {tripObj['start_date']}</div>
        <div>End Date: {tripObj['end_date']}</div>
      </div>
    )
  } else {
    return <div>Nothing in this.</div>
  }
}
