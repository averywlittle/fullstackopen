import React from 'react'

const FilterForm = (props) => (
    <div>
        filter via text: <input value={props.filter} onChange={props.handleFilterChange}/>
    </div>
)

export default FilterForm