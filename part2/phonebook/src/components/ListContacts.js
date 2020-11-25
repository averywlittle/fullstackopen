import React from 'react'

const ListContacts = (props) => {

    let persons = props.persons

    if (props.filter !== '') {
        persons = props.persons.filter(person => person.name.includes(props.filter))
    }

    let content = persons.map(person => <div key={person.name}>{person.name}, {person.number}<button onClick={() => props.removeContact(person)}>remove</button></div>)
    return content
}

export default ListContacts