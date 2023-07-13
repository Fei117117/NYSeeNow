import { useSelection } from '../../context/SelectionContext'
import { useEffect } from 'react'
export const MarkerHoverCard = (props) => {
  const { selectedList, setSelectedList } = useSelection()

  const add_attraction = () => {
    if (selectedList == null) {
      setSelectedList([props.place_name])
    } else {
      setSelectedList([...selectedList, props.place_name])
    }
    console.log(selectedList)
  }

  return (
    <>
      <div className="hover-card-containter" onMouseLeave={props.onClose}>
        <h3>{props.place_name}</h3>
        <button onClick={add_attraction}>Add to itenerary</button>
        <button onClick={props.onClose}>Close</button>
      </div>
    </>
  )
}
