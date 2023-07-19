import React, { useState, useEffect } from 'react'
import SidebarContent from './SidebarContent'
import AttractionCounter from './AttractionCounter'
import { Link } from 'react-router-dom'
import { useSelection } from '../context/SelectionContext'
import { useNavigate } from 'react-router-dom'
import { post_itinerary } from '../net/net'
import { useTripData } from '../context/TripDataContext'
import axios from 'axios'

export const SideBar = ({ isOpen, setIsOpen }) => {
  // State for holding the left position of AttractionCounter
  const [counterLeft, setCounterLeft] = useState('60px')

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [attractionListToSend, setAttractionListToSend] = useState([])

  const { selectedList, setSelectedList } = useSelection()
  const { tripData, setTripData } = useTripData()
  const navigate = useNavigate()

  const handleSubmitButton = () => {
    console.log('calling submit funtion')
    console.log('SENDING REQUEST')
    const request_obj = {
      start_date: startDate,
      end_date: endDate,
      attraction_list: selectedList
    }

    const url = 'itinerary/predict'

    const req_string = JSON.stringify(request_obj)

    axios
      .post(url, req_string, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Success!')
        console.log(response)
        setTripData(response.data)
        navigate('/itinerary-builder')
        setIsOpen(false)
      })
      .catch((error) => {
        console.log('You have an error!')
        console.log(error)
      })
  }

  useEffect(() => {
    setCounterLeft(isOpen ? 'calc(50% + 60px)' : '60px') // update the position according to sidebar's state
  }, [isOpen])

  return (
    <aside className={`side-bar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-icons">
        <div
          className="hamburger-icon"
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <img src="hamburger.png" alt="Menu" />
        </div>
        <Link to="/itineraries">
          <img src="calendar.png" alt="Calendar" />
        </Link>
        <img src="marker.png" alt="Marker" />
        <div className="question-mark-icon">
          <img src="question_mark.png" alt="Help" />
        </div>
      </div>
      <div className="sidebar-content">
        <SidebarContent
          open={isOpen}
          getStartDate={setStartDate}
          getEndDate={setEndDate}
          submitHandler={handleSubmitButton}
          currStartDate={startDate}
          currEndDate={endDate}
        />
      </div>
      <AttractionCounter left={counterLeft} />
    </aside>
  )
}
