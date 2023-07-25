import { useEffect } from 'react'

export const TripContainer = (props) => {
  useEffect(() => {
    const trip_detail_string = props.trip_details
    console.log('My Trip Details are:', trip_detail_string)
  }, [])

  return <div>Somethings</div>
}
