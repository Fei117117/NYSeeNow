import React, { useState, useEffect } from 'react';
export const WeatherCard = () => {

  function convertTime(time){
    // Convert the time to New York time
    const nyOffset = -4; // New York is 4 hours behind Irish time
    const date = new Date((time + nyOffset * 3600) * 1000);

    // Get hours, minutes, and seconds
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    // Convert to 12-hour format
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    // Format the time
    const readableTime = `${hours.toString().padStart(2, '0')}:${minutes} ${meridiem}`;
  return readableTime;
  }


  function WeatherDisplay({ currentWeather }) {
    if (!currentWeather) {
      return <div>Loading weather data...</div>;
    }

    const today = (
      <div>
        Today: <img src={`../../assets/weather_assets/weather_icons/${currentWeather.current.weather[0].icon}.png`} id='weather-icon' />
      </div>
    );
    
    const time= convertTime(currentWeather.current.dt);
    const temp = `Current Temperature: ${currentWeather.current.temp}°C`;
    const feels_like = `Feels Like: ${currentWeather.current.feels_like}°C`;
    const humidity = `Humidity: ${currentWeather.current.humidity} %`;
    const wind_speed = `Wind Speed: ${currentWeather.current.wind_speed} m/s`;
    var rain ='Rain: 0 mm';
    if (currentWeather.current.rain === undefined) {
      rain  = 'Rain: 0 mm';
    }
    else{
      rain = `Rain: ${currentWeather.current.rain['1h']} mm`;
    }
    var snow = 'Snow: 0 mm';
    if (currentWeather.current.snow === undefined) {
      snow = 'Snow: 0 mm';
    }
    else{
      snow = `Snow: ${currentWeather.current.snow['1h']} mm`;
    }

    return (
      <div id="current-weather">
        <div className='weather-item'>{time}</div>
        <div className='weather-item'>{today}</div>
        <div className='weather-item'>{temp}</div>
        <div className='weather-item'>{feels_like}</div>
        <div className='weather-item'>{rain}</div>
        <div className='weather-item'>{humidity}</div>
        <div className='weather-item'>{snow}</div>
        <div className='weather-item'>{wind_speed}</div>       
      </div>
    );
  }

  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const owUri = 'https://api.openweathermap.org/data/3.0/onecall?';
        const owLat = 40.7834300;
        const owLon = -73.9662500;
        const owKey =  '0b1cf2b24bd3ed36a449501ff15b4131';

        const response = await fetch(`${owUri}lat=${owLat}&lon=${owLon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${owKey}`);

        if (response.ok) {
          const weatherData = await response.json();
          console.log('Connected to OpenWeather and data collected successfully');
          console.log(weatherData);
          setCurrentWeather(weatherData);
        } else {
          console.error('Failed to fetch weather data:', response.statusText);
        }
      } catch (error) {
        console.error('Error while fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className='weather-data'>
      {/* Render the weather display component */}
      <WeatherDisplay currentWeather={currentWeather} />
    </div>
  );
}
