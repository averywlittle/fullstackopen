import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification.length === 0) {
    style = {
      ...style,
      display: 'none'
    }
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification