import React, { useState, useEffect } from "react";
import FilteredCountries from './components/FilteredCountries'
import axios from "axios";


function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = filter.trim().length === 0 ? false : countries.filter(country => country.name.common.toLowerCase().includes(filter));
  
  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <FilteredCountries countries={filteredCountries} countriesLength={filteredCountries.length}/>
    </div>
  );
}

export default App;
