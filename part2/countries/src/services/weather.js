import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;
const baseURL = 'https://api.openweathermap.org';

const getCurrent = (latlng) => {
  const [lat, lon] = latlng;
  return axios
    .get(`${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    .then((res) => res.data);
};

const service = {
  getCurrent,
};

export default service;
