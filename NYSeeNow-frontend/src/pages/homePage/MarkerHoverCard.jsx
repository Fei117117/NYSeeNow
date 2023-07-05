import { useSelection } from '../../context/SelectionContext'
import { useEffect } from 'react'
export const MarkerHoverCard = (props) => {
  const { selectedList, setSelectedList } = useSelection()

  const add_attraction = () => {
    let new_list
    if (selectedList == null) {
      setSelectedList([props.place_name])
    } else {
      new_list = selectedList
      new_list.push(props.place_name)
      setSelectedList(new_list)
    }
    console.log(selectedList)
  }

  return (
    <>
      <div className="hover-card-containter">
        <h3>{props.place_name}</h3>
        <button onClick={add_attraction}>Add to itenerary</button>
        <button onClick={props.onClose}>Close</button>
      </div>
    </>
  )
}
