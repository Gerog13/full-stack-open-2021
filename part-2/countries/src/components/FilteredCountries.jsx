import React, { useState } from "react";

const CountryView = ({ country }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: ".5rem",
        borderRadius: "20px",
        border: "1px solid #000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "250px",
        position: "relative",
      }}
      key={country.name.common}
    >
      <h3 style={{ fontSize: "1.8rem" }}>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <strong>Languages:</strong>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>
            <p>{language}</p>
          </li>
        ))}
      </ul>
      <img
        src={country.coatOfArms.svg}
        alt={country.name.common}
        height="150"
        width="150"
      />
    </div>
  );
};

const FilteredCountries = ({ countries, countriesLength }) => {
  const [countryToShow, setCountryToShow] = useState();

  return (
    <>
      <div>
        {countriesLength > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {countriesLength < 10 && countriesLength > 1 && (
          <div>
            {countries?.map((country, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h2 key={index}>{country.name.common}</h2>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setCountryToShow(country);
                  }}
                >
                  Show
                </button>
              </div>
            ))}
            {countryToShow && (
              <CountryView
                setCountryToShow={setCountryToShow}
                country={countryToShow}
              />
            )}
          </div>
        )}
        {countriesLength === 1 &&
          countries?.map((country, index) => (
            <CountryView key={index} country={country} />
          ))}
      </div>
    </>
  );
};

export default FilteredCountries;
