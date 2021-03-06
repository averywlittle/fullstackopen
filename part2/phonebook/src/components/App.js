import React, { useState, useEffect } from 'react'
import ListContacts from './ListContacts'
import ContactForm from './ContactForm'
import FilterForm from './FilterForm'
import ContactsService from '../services/persons'
import Notification from './Notification'

const App = () => {
    
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(false)

  useEffect(() => {
    console.log('effect')

    ContactsService
      .getAll()
      .then(initialContacts => {
        console.log('promise fulfilled')
        setPersons(initialContacts)
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

    const existingContact = persons.find(person => person.name === newName)

    if (!existingContact) {

        ContactsService
          .create({ name: newName, number: newNumber })
          .then(returnedContact => {

            if (returnedContact) {
              setPersons(persons.concat(returnedContact))
              setNewNumber('')
              setNewName('')

              setMessage(
                `'${returnedContact.name}' was added successfully!`
              )
              setTimeout(() => {
                setMessage(null)
              }, 4500)
            }
          })
          .catch(error => {
            
            setError(true)
            setMessage(
              `${error}, ${error.response.data.error}`
              )
            setTimeout(() => {
              setMessage(null)
              setError(false)
            }, 4500)
          })
    }
    else {
        
      let result = window.confirm(`${existingContact.name} already exists in the phonebook, update their number?`);

      if (result) {

        const updatedContact = { ...existingContact, number: newNumber}

        ContactsService.update(existingContact.id, updatedContact)
          .then(returnedContact => {

            if (returnedContact) {

              setPersons(persons.map(person => person.id !== returnedContact.id ? person : returnedContact))
              setNewNumber('')
              setNewName('')

              setMessage(
                `'${returnedContact.name}' was edited successfully!`
              )
              setTimeout(() => {
                setMessage(null)
              }, 4500)
            }
          })
          .catch(error => {
            
            setError(true)
            setMessage(
              `${error}, ${error.response.data.error}`
              )
            setTimeout(() => {
              setMessage(null)
              setError(false)
            }, 4500)
          })
      }
    }
  }

  const removeContact = (contact) => {

    let result = window.confirm(`Are you sure you want to delete ${contact.name}`);

    if (result) {
      
      ContactsService.remove(contact.id)
      .then(response => {

        if (response.status === 204) {
          setPersons(persons.filter(person => person.id !== contact.id))
          
          setMessage(
            `'${contact.name}' was removed successfully.`
          )
          setTimeout(() => {
            setMessage(null)
          }, 4500)
        }
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} error={error}/>
        <FilterForm filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new contact:</h2>
        <ContactForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <ListContacts persons={persons} filter={filter} removeContact={removeContact}/>
    </div>
  )
}

export default App