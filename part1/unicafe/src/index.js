import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick} feedback={text}>
    {text}
  </button>
)

const Statistic = (props) => (
  <tr>
    <td>{props.name} </td><td>{props.value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  if(good > 0 || neutral > 0 || bad > 0) {
    return (
    <table>
      <tbody>
        <Statistic name='good' value={good}/>
        <Statistic name='neutral' value={neutral}/>
        <Statistic name='bad' value={bad}/>
        <tr>
          <td>all </td> 
          <td>{good + bad + neutral}</td>
        </tr>
        <tr>
          <td>average </td>
          <td>{((good - bad)/(good + neutral + bad))}</td>
        </tr>
        <tr>
          <td>positive </td>
          <td>{((good/(good + neutral + bad)) * 100)}%</td>
        </tr>
      </tbody>
    </table>
    )
  }
  else return (<div>No feedback given</div>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (feedback) => {
    if(feedback === 'good') {
      setGood(good + 1);
    }
    else if(feedback === 'neutral') {
      setNeutral(neutral + 1);
    }
    else {
      setBad(bad + 1);
    }
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button onClick={() => {handleFeedback('good')}} text='good'/>
        <Button onClick={() => {handleFeedback('neutral')}} text='neutral'/>
        <Button onClick={() => {handleFeedback('bad')}} text='bad'/>
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)