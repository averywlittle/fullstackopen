import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const anecdotes = useSelector(state => state.anecdotes)
  // const filter = useSelector(state => state.filter)
  // const dispatch = useDispatch()

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)

    props.showNotification(`You voted the anecdote: ${anecdote.content}`, 5)
  }
  return (
    <div>
      {props.anecdotes
        .filter(a => a.content.includes(props.filter))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
)}

const mapDispatchToProps = {
  voteAnecdote,
  showNotification
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList