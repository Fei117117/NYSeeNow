import React, { useState, useEffect } from 'react'
import SidebarContent from './SidebarContent'
import AttractionCounter from './AttractionCounter'
import { Link } from 'react-router-dom'
import { useSelection } from '../context/SelectionContext'
import { useNavigate } from 'react-router-dom'

export const SideBar = ({ isOpen, setIsOpen }) => {
  // State for holding the left position of AttractionCounter
  const [counterLeft, setCounterLeft] = useState('60px')

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [attractionListToSend, setAttractionListToSend] = useState([])
  const [requestSendFlag, setRequestSendFlag] = useState(false)

  const { selectedList, setSelectedList } = useSelection()

  const handleSubmitButton = () => {
    setRequestSendFlag(true)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (requestSendFlag) {
      console.log('SENDING REQUEST')
      console.log(selectedList)
      console.log(startDate)
      console.log(endDate)
      //Get all the current data to itinerary builder

      const content = 'Hello, world!'

      navigate('/itinerary-builder')
      setIsOpen(false)
    }
  }, [requestSendFlag])

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
