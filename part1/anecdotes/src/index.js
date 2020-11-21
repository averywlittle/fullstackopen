import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick} feedback={text}>
    {text}
  </button>
)

const App = (props) => {

  const initializeVotes = () => {
    return new Array(anecdotes.length).fill(0)
  }
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initializeVotes())
  // The top anecdote is just set to the first one
  const [topAnecdote, setTopAnecdote] = useState(0)
  

  const selectAnecdote = () => {
    const max = anecdotes.length
    let index = Math.floor(Math.random() * max)
    setSelected(index)
  }

  const vote = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    // Compare the current anecdote to the current top anecdote
    // in the updated copy of the votes array
    if(copy[selected] > copy[topAnecdote]) 
      setTopAnecdote(selected);
  }

  return (
    <div>
      <h2>Current Anecdote</h2>
      {props.anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <div>
        <Button onClick={selectAnecdote} text={'next anecdote'}/>
        <Button onClick={vote} text={'vote'}/>
      </div>
      <h2>Top Anecdote</h2>
      {anecdotes[topAnecdote]}
      <br></br>
      has {votes[topAnecdote]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)