import React from 'react'

const Query = (props) => (
    <div>
      find countries <input type="text" value={props.query} onChange={props.handleQuery}/>
    </div>
)

export default Query