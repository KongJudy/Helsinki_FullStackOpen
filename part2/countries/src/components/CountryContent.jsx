const CountryContent = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital} <br />
        area {country.area}
      </p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} width={200} />
    </>
  );
};

export default CountryContent;
