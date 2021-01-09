import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))

    dispatch(showNotification(`You added the anecdote: ${content}`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm