import React from 'react'
import CountryView from './CountryView'

const Matches = (props) => {

    if (props.query === '') {
      return (
        <div>Type something above to search for a European country by name</div>
        )
    }
  
    if (props.selectedCountry.length !== 0) {
      return (
        <CountryView country={props.selectedCountry[0].match}/>
      )
    }
  
    let matches = props.countries.filter(country => country.name.includes(props.query))
  
    if (matches.length > 10) {
      return (
        <p>Too many matches, specifiy another filter</p>
        )
    }
    else if (matches.length === 1) {
      return (
        <CountryView country={matches[0]}/>
      )
    }
    else {
      let content = matches.map(match => <div>{match.name} <button onClick={() => {props.setSelectedCountry([{match}])}} type="submit">show</button></div>)
      return content
    }
}

export default Matches