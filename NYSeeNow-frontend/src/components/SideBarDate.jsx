import { useState } from 'react'
import styles from './SideBarDate.module.css'

const SideBarDate = ({ startDateSetter, endDateSetter }) => {
  return (
    <>
      <h2>
        <u>Choose Trip Period</u>
      </h2>
      <div className={styles['date-display-container']}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          placeholder="dd/mm/yyyy"
          type="date"
          onChange={(event) => {
            startDateSetter(event.target.value)
          }}
        ></input>
        <p>|</p>
        <label htmlFor="endDate">End Date:</label>
        <input
          id="startDate"
          placeholder="dd/mm/yyyy"
          type="date"
          onChange={(event) => {
            endDateSetter(event.target.value)
          }}
        ></input>
      </div>
    </>
  )
}

export default SideBarDate
