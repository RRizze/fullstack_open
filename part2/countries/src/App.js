import { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import Country from './components/Country';
import countryService from './services/countries';
import weatherService from './services/weather';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countrySearch, setCountrySearch] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [filteredCountries, setFilteredCountries] = useState([...countries]);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countrySearch, countries]);

  useEffect(() => {
    countryService
      .getAll()
      .then((returnedCountries) => {
        setCountries(returnedCountries);
        setFilteredCountries(returnedCountries);
      });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const latlng = filteredCountries[0].capitalInfo.latlng;

      weatherService
        .getCurrent(latlng)
        .then((data) => {
          setWeatherData(data);
        });
    }
  }, [filteredCountries]);

  const handleCountryChange = (e) => {
    setCountrySearch(e.target.value);
  }

  const handleShowCountry = (country) => {
    setCountrySearch(country.name.common);
  };

  return (
    <>
      <div>
        Find countries: 
        <input
          value={countrySearch}
          onChange={handleCountryChange}
        />
      </div>
     
      <h2>Countries</h2>
      {filteredCountries.length === 1
        ? <>
            <Country
              country={filteredCountries[0]}
              weatherData={weatherData} />
          </>
        : <CountryList
            countries={filteredCountries}
            handleShow={handleShowCountry}
          />
      }
    </>
  );
}

export default App;
