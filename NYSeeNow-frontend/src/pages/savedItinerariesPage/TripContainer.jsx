import React, { useEffect, useState } from 'react'
import styles from './TripContainer.module.css'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const TripContainer = (props) => {
  const [tripObj, setTripObj] = useState(null)
  const { authUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const trip_detail_string = props.trip_details
    setTripObj(JSON.parse(trip_detail_string))
  }, [props.trip_details])

  const handleDelete = async () => {
    try {
      const username = tripObj?.username

      if (!username) {
        console.error('Username is undefined')
        return
      }

      const response = await axios.delete(`/trip/delete/${username}/${tripObj['trip_id']}`)

      if (response.status === 200) {
        // Refresh the component or do something after the trip is deleted
        console.log('Trip deleted successfully')
      } else {
        console.error('Failed to delete trip')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Function to handle Edit button click
  const handleEdit = () => {
    navigate('/ItineraryEdit', { state: { trip_id: tripObj.trip_id, username: tripObj.username } })
  }

  if (tripObj) {
    return (
      <div className={styles.tripContainer}>
        <div className={styles.tripDetails}>
          <img src="/NYSeeLogo.png"></img>
          <div>Trip Id: {tripObj['trip_id']}</div>
          <div>Number of Attractions: {tripObj['number_of_attractions']}</div>
          <div>Start Date: {tripObj['start_date']}</div>
          <div>End Date: {tripObj['end_date']}</div>
        </div>

        <button
          className="card-delete-button-trip"
          onClick={() => {
            console.log(authUser)
            handleDelete()
          }}
        >
          Delete
        </button>
        <button className="card-edit-button-trip" onClick={handleEdit}>
          Edit
        </button>
      </div>
    )
  } else {
    return <div>Nothing in this.</div>
  }
}
