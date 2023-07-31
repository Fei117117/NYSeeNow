import styles from './WeatherCard.module.css'

export const WeatherCard = ({}) => {
  return (
    <div className={styles.weather_card}>
        <div className={styles.weather_card_header}>
            <h2>Weather</h2>
        </div>
        <div className={styles.weather_card_body}>
            <div className={styles.weather_card_body_row}>
                <div className={styles.weather_card_body_row_col}>
                    <h3>Temperature</h3>
                    <p>70</p>
                </div>
                <div className={styles.weather_card_body_row_col}>
                    <h3>Humidity</h3>
                    <p>70</p>
                </div>
            </div>
            <div className={styles.weather_card_body_row}>
                <div className={styles.weather_card_body_row_col}>
                    <h3>Wind Speed</h3>
                    <p>70</p>
                </div>
                <div className={styles.weather_card_body_row_col}>
                    <h3>Wind Direction</h3>
                    <p>70</p>
                </div>
            </div>  
        </div>
    </div>
  )
}
