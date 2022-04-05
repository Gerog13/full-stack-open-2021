import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryView = ({ country, weather }) => {
  return (
    <>
      {weather && (
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
          <div>
            <h3 style={{ textTransform: "capitalize" }}>
              Weather in {country.name.common}
            </h3>
            <p>Temperature : {weather.data.main.temp} Celcius</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            ></img>
            <p>wind {weather.data.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </>
  );
};

const FilteredCountries = ({ countries, countriesLength, filter }) => {
  const [countryToShow, setCountryToShow] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    const delay = setTimeout(() => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${filter}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`
        )
        .then((response) => {
          setWeather(response);
        });
    }, 1000);
    return () => clearTimeout(delay);
  }, [filter]);

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
            {countryToShow && weather &&  (
              <CountryView
                setCountryToShow={setCountryToShow}
                country={countryToShow}
                weather={weather}
              />
            )}
          </div>
        )}
        {countriesLength === 1 &&
          countries?.map((country, index) => (
            <CountryView key={index} country={country} weather={weather} />
          ))}
      </div>
    </>
  );
};

export default FilteredCountries;
