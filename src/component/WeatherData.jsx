import React, { useState } from 'react';
import axios from 'axios';

const WeatherData = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const doLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const doSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
      headers: {
        'x-rapidapi-key': 'fde4161c65msh1108ab83b5904fdp18967ejsncbb2bc706b25',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
      },
      params: {
        q: location
      }
    });

    setWeatherData(response.data);
  };

  if (!weatherData) {
    return (
      <div>
        <form onSubmit={doSubmit}>
          <label>
            Please Enter a location (city)
            <input type="text" value={location} onChange={doLocationChange} />
          </label>
          <button type="submit">Get Weather</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={doSubmit}>
        <label>
          Enter a location:
          <input type="text" value={location} onChange={doLocationChange} />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      <h1>Current Weather in {weatherData.location.name}, {weatherData.location.region}</h1>
      <p>Temperature: {weatherData.current.temp_f} F</p>
      <p>Condition: {weatherData.current.condition.text}</p>
    </div>
  );
};

export default WeatherData;
