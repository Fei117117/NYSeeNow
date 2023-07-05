import React, { useState } from 'react'

import styles from './CategoriesDropDown.module.css'

const CategoryDropDown = () => {
  const options = [
    { id: 1, label: 'Mainstream' },
    { id: 2, label: 'Parks' },
    { id: 3, label: 'Theatres' },
    { id: 4, label: 'Option 4' }
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

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
    toggleDropdown
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
