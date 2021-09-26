import React from 'react'
import Filter from './Filter'

const showLanguages = (languages) => {
  return(
    languages.map(language =>
      <li key={language.name}>{language.name}</li>
      )
  )
}

const DisplayCountries = (countries, filterInput, setFilterInput, weather) => {

  let filteredCounties = Filter(countries, filterInput)
  if (filteredCounties.length > 10) {
    return(
      <div>Too many matches, specify another filter.</div>
    )
  }

  if (filteredCounties.length === 1) {
    console.log(weather);
    return(
      filteredCounties.map(country =>
        <div key={country.name}>
          <h1>{country.name}</h1>
          <div>Capital: {country.capital}</div>
          <div>Population: {country.population}</div>
          <h2>languages</h2>
          <ul>
            {showLanguages(country.languages)}
          </ul>
          <img src={country.flag} alt={country.name} width="160" />
          <h2>Weather in {country.name}</h2>
          <div><b>temperature:</b> {weather.current.temperature}</div>
          <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} width="80" />
          <div><b>wind:</b> {weather.current.wind_speed} mph</div> 
          <div><b>direction:</b> {weather.current.wind_dir}</div>
        </div>
        )
    )
  }

  return(
    filteredCounties.map(country => 
      <p key={country.name}>
        {country.name} 
        <button onClick={() => setFilterInput(country.name)}>
          Show
        </button>
      </p>
    )
  )
}

export default DisplayCountries