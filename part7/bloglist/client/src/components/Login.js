import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import Notification from '../components/Notification'
import { showNotification } from '../reducers/notificationReducer'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (username) => {
    setUsername(username)
  }

  const handlePassword = (password) => {
    setPassword(password)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const result = await props.loginUser({ username, password })

    if (result === 'Wrong credentials') {
      props.showNotification(result, 5)

      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>log into application</h2>

      <Notification />

      <form onSubmit={handleLogin}>
        <div>
          username
        <input
            type="text"
            value={username}
            id='username'
            name="Username"
            onChange={({ target }) => handleUsername(target.value)}
          />
        </div>
        <div>
          password
        <input
            type="text"
            value={password}
            id='password'
            name="Password"
            onChange={({ target }) => handlePassword(target.value)}
          />
        </div>
        <button type="submit" id='login-button'>login</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  loginUser,
  showNotification
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
export default ConnectedLogin