import React, { useState } from 'react'

import styles from './CategoriesDropDown.module.css'

import options from '../assets/attraction_options.json'

import { useCategories } from '../context/CategoriesContext'

const CategoryDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedOptions, setSelectedOptions } = useCategories()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionChange = (optionId) => {
    const isSelected = selectedOptions.includes(optionId)

    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId))
    } else {
      setSelectedOptions([...selectedOptions, optionId])
    }
  }

  return (
    <div className={styles.categoryBlock}>
      <a onClick={toggleDropdown}>Categories</a>
      {isOpen && (
        <div className={styles.dropdownContainer}>
          {options.map((option) => (
            <label key={option.id}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryDropDown
