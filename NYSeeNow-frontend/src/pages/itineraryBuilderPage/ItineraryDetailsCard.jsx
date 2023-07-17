import styles from './ItineraryDetailsCard.module.css'
const ItineraryDetailsCard = (props) => {
  console.log(props.attraction)
  return (
    <>
      <div className={styles.ItnDetailsCard}>{props.attraction.properties.name}</div>
    </>
  )
}

export default ItineraryDetailsCard
