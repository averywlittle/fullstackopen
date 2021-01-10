import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    // input-field value is in variable event.target.value
    console.log('filter change', event.target.value)
    props.setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter: <input onChange={handleChange}></input>
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
  )(Filter)
export default ConnectedFilter