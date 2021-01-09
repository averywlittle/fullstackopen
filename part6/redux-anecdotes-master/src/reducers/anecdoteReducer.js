import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const changedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    }
    case 'NEW_ANECDOTE': {
      return state.concat(action.data)
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default: return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteToUpdate = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(anecdoteToUpdate)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer