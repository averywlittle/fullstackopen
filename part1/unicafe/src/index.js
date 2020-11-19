import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick} feedback={text}>
    {text}
  </button>
)

const calcAvg = (good, neutral, bad) => {
  return ((good + neutral) - bad)/3
}

const calcPositive = (good, neutral, bad) => {
  return (good/(good + neutral + bad)) * 100
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  // These need to use useState hooks
  let average = 0;
  let positive = 0;

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
    
    average = calcAvg(good, neutral, bad);
    positive = calcPositive(good, neutral, bad);
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
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + bad + neutral}</p>
        <p>average {average}</p>
        <p>positive {positive}%</p>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)