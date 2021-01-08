import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

function App() {

  return (
    <div className="App">
      <div>
        {store.getState()}
      </div>
      <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>
        zero
      </button>
    </div>
  );
}

export default App;
