import React from 'react'
import AttractionCard from './AttractionCard'
import { useSelection } from '../context/SelectionContext'
import SideBarDate from './SideBarDate'
import styles from './SidebarContent.module.css'

const SidebarContent = ({
  open,
  getStartDate,
  getEndDate,
  submitHandler,
  currStartDate,
  currEndDate
}) => {
  const { selectedList, setSelectedList } = useSelection()

  const handleDelete = (attractionName) => {
    setSelectedList(selectedList.filter((attraction) => attraction['name'] !== attractionName))
  }

    // Iterate over the selectedList and create a div for each attraction
  return (
    <div className={`sidebar-content ${!open ? 'closed' : ''}`}>
      <SideBarDate startDateSetter={getStartDate} endDateSetter={getEndDate}></SideBarDate>
      {selectedList && (
        <h2>
          <u>Attractions</u>
        </h2>
      )}
      {selectedList &&
        selectedList.map((attraction, index) => (
          <AttractionCard
            key={index}
            attraction={attraction}
            onDelete={handleDelete}
            startDate={currStartDate}
            endDate={currEndDate}
          />
        ))}
      {selectedList && (
        <div className={styles.buttonContainer}>
          <button onClick={submitHandler}>Plan Trip</button>
        </div>
      )}
    </div>
  )
}

export default SidebarContent
