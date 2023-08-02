const Weather = ({ countryName, data }) => {
  if (Object.keys(data).length === 0) {
    return null;
  }
  const wind = data.wind.speed;
  const temp = (Number(data.main.temp) - 273.15).toFixed(2);
  const icon = data.weather[0].icon;
  const icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <>
      <h3>Weather in {countryName}</h3>
      <p>Temperature {temp} Celcius</p>
      <img
        src={icon_url}
        alt='weather icon' width='120' height='120'/>
      <p>Wind {wind} m/s</p>
    </>
  );
};

export default Weather;
