const Filter = (countries, filterInput) => {
  const inputLower = filterInput.toLowerCase()
  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(inputLower))

  return countriesToShow
}

export default Filter