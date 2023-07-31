export const WeatherCard = ({currentWeather}) => {
  return (
        <div className="weather-data">
          {/* Display the weather data here */}
          <h2>Current Weather:</h2>
          <pre>{JSON.stringify(currentWeather, null, 2)}</pre>
        </div>
  )
}
