import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import services from './services/countries';
import Countries from './components/Countries';
import WeatherContent from './components/WeatherContent';

const App = () => {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState(null);
  const [showCountry, setShowCountry] = useState(null);
  const [showWeather, setShowWeather] = useState(null);

  useEffect(() => {
    if (value) {
      services.getAll().then((initialCountries) => {
        setCountries(
          initialCountries.filter((country) =>
            country.name.common.toLowerCase().includes(value.toLowerCase())
          )
        );
      });
    }
  }, [value]);

  useEffect(() => {
    if ((countries && countries.length === 1) || showCountry) {
      const country = countries[0];

      services
        .getWeather(country.capital)
        .then((initialWeather) => setShowWeather(initialWeather));
    }
  }, [countries, showCountry]);

  // console.log(showWeather);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setShowCountry(null);
    setShowWeather(null);
  };

  const handleShowCountry = (country) => {
    setShowCountry(country);
  };

  return (
    <>
      <Filter value={value} onChange={handleInputChange} />
      <Countries
        countries={countries}
        handleShowCountry={handleShowCountry}
        showCountry={showCountry}
        weather={showWeather}
      />
      <WeatherContent weather={showWeather} />
    </>
  );
};
export default App;
