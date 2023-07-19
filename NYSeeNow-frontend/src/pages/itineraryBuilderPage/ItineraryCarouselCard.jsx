import ItineraryDetailsCard from './ItineraryDetailsCard'
import styles from './ItineraryCarouselCard.module.css'

const ItineraryCarouselCard = (props) => {
  let attractions_for_day = props.value

  return (
    <>
      <div className={styles.carouselCard}>{props.day}</div>
      {attractions_for_day.map((attraction, key) => (
        <ItineraryDetailsCard
          key={key}
          cardkey={key}
          attraction={attraction}
        ></ItineraryDetailsCard>
      ))}
    </>
  )
}

export default ItineraryCarouselCard
