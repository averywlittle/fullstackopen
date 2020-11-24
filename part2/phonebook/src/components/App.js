import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListContacts from './ListContacts'
import ContactForm from './ContactForm'
import FilterForm from './FilterForm'

const App = () => {
    
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'contacts')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
      setFilter(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()

    if (!persons.map(person => person.name).includes(newName)) {
        setPersons(persons.concat({ name: newName, number: newNumber }))
        setNewNumber('')
        setNewName('')
    }
    else {
        window.alert(`${newName} already exists in your phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <FilterForm filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new contact:</h2>
        <ContactForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <ListContacts persons={persons} filter={filter}/>
    </div>
  )
}

export default App