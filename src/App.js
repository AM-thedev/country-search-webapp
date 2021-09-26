import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'
import InputForm from './components/InputForm'
import Filter from './components/Filter'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const [weather, setWeather] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('Promise fulfilled!')
      setCountries(response.data)
    })
  }, [])
  let capital
  let country
  let haveCountry = Filter(countries, filterInput)[0]
  if (haveCountry) {
    capital = haveCountry.capital
    country = haveCountry.name
  }

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    type: 'city',
    query: `${capital}, ${country}`
  }
  useEffect(() => {
    console.log('effect')
    axios
    .get(`http://api.weatherstack.com/current`, {params})
    .then(response => {
      console.log('Promise fulfilled!')
      setWeather(response.data)
    })
  }, [capital, country])
  console.log(weather, `${capital}, ${country}`)

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value)
  }

  return (
    <div>
      {InputForm('Find countries: ', filterInput, handleFilterChange)}
      {DisplayCountries(countries, filterInput, setFilterInput, weather)}
    </div>
  )
}

export default App