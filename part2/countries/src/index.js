import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Matches from './components/Matches'
import Query from './components/Query'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])

  useEffect(() => {

    console.log('effect')

    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {

        if (response) {
          console.log('promise fulfilled')
          setCountries(response.data)
        }

      })

  }, [])
  console.log('render', countries.length, 'countries')


  const handleQuery = (event) => {
    setQuery(event.target.value)
    setSelectedCountry([]);
  }

  return (
    <div>
      <Query query={query} handleQuery={handleQuery}/>
      <Matches query={query} countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))