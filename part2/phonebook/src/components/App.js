import React, { useState } from 'react'
import ListContacts from './ListContacts'
import ContactForm from './ContactForm'
import FilterForm from './FilterForm'

const App = () => {
    
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '867-5309' },
    { name: 'Harlan Moon', number: '549-2245' },
    { name: 'Carl Sagan', number: '473-6891' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

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