const WeatherContent = ({ weather }) => {
  if (!weather) {
    return null;
  }

  const weatherIcon = weather.weather[0].icon;
  // console.log(weatherIcon);

  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

  const iconAlt = weather.weather[0].description;

  return (
    <>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={iconUrl} alt={iconAlt} width={120} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default WeatherContent;
