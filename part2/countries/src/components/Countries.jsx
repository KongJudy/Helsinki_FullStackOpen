import Country from './Country';
import CountryContent from './CountryContent';

const Countries = ({ countries, handleShowCountry, showCountry }) => {
  if (!countries) {
    return null;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return (
      <>
        <CountryContent country={countries[0]} />
      </>
    );
  }

  if (showCountry) {
    return (
      <>
        <CountryContent country={showCountry} />
      </>
    );
  }

  return (
    <>
      {countries.map((country) => (
        <Country
          key={country.name.common}
          country={country}
          onClick={() => handleShowCountry(country)}
        />
      ))}
    </>
  );
};

export default Countries;
