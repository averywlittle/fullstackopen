import React from 'react'

const FilterForm = (props) => (
    <input value={props.filter} onChange={props.handleFilterChange}/>
)

export default FilterForm