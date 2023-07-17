import React, { useEffect } from 'react'
import styles from './AttractionCard.module.css'

const AttractionCard = ({ attraction, onDelete, startDate, endDate }) => {
  const getDatesInRange = () => {
    const date = new Date(startDate)
    const endDateForProcess = new Date(endDate)
    const dates = []

    while (date <= endDateForProcess) {
      dates.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }

    return dates
  }

  let days = getDatesInRange()

  useEffect(() => {
    days = getDatesInRange()
  }, [startDate, endDate])

  const handleDayChange = (event) => {
    attraction.day = event.target.value
  }

  return (
    <div className="attraction-card">
      <div className="card-header">
        <h2>{attraction.name}</h2>
        <button className="card-delete-button" onClick={() => onDelete(attraction.name)}>
          X
        </button>
        </div>
      <p className="card-content">
        This is a placeholder for your attraction details. Replace this text with the actual
        details.
      </p>
      <div className={styles['day-selector']}>
        <label htmlFor="visitDay">Select the day:</label>
        <select name="day" id="visitDay" onChange={handleDayChange}>
          <option value={null}>Not Selected</option>
          {days &&
            days.map((day, index) => (
              <option key={index} value={day}>
                Day {index + 1}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

export default AttractionCard
