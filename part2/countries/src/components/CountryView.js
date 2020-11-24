import React from 'react'

const CountryView = (props) => (
    <div>
      <h2>{props.country.name}</h2>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h3>languages</h3>
      <ul>
      {props.country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <div><img alt="country flag" src={props.country.flag}></img></div>
    </div>
  )

  export default CountryView