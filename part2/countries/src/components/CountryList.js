const CountryList = ({ countries, handleShow }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter...</div>
    );
  } else if (countries.length === 0) {
    return null;
  } else {
    return (
      <ul>
        {countries.map(c => (
          <li key={c.area+c.name.common}>
            {c.name.common}
            <button onClick={() => handleShow(c)}>show</button>
          </li>
        ))}
      </ul>
    );
  }
};

export default CountryList;
