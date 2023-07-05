import React, { useState, useContext } from 'react'

const CategoriesContext = React.createContext()

export const useCategories = () => {
  return useContext(CategoriesContext)
}

export function CategoriesProvider(props) {
  const [selectedCategories, setSelectedList] = useState(null)

  const value = {
    selectedList,
    setSelectedList
  }

  return <SelectionContext.Provider value={value}>{props.children}</SelectionContext.Provider>
}
