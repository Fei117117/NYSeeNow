import React, { useState, useContext } from 'react'

const SelectionContext = React.createContext()

export const useSelection = () => {
  return useContext(SelectionContext)
}

export function SelectionProvider(props) {
  const [selectedList, setSelectedList] = useState(null)

  const value = {
    selectedList,
    setSelectedList
  }

  return <SelectionContext.Provider value={value}>{props.children}</SelectionContext.Provider>
}
