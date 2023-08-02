import Weather from './Weather';

const Country = ({ country, weatherData }) => {
  const langs = Object.values(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {langs.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <div>
        <img
          alt='flag of country'
          src={country.flags.png}
          width='230px'
          height='145px'
          className='flag'
        />
      </div>
      <Weather countryName={country.name.common}
        data={weatherData} />
    </div>
  );
};

export default Country;
