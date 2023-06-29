export const MarkerHoverCard = (props) => {
  const add_attraction = () => {
    console.log('add button clicked')
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
