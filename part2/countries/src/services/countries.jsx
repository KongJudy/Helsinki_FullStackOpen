import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?q=';

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const getWeather = (capital) => {
  const req = axios.get(
    `${weatherApi}${capital}&units=metric&appid=${
      import.meta.env.VITE_WEATHERAPP_ID
    }`
  );
  return req.then((res) => res.data);
};

export default {
  getAll,
  getWeather
};
