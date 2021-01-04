import React from 'react'
import PropTypes from 'prop-types'

const Login = (props) => (
  <div>
    <h2>log into application</h2>
    <form onSubmit={props.handleLogin}>
      <div>
          username
        <input
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.handleUsername(target.value)}
        />
      </div>
      <div>
          password
        <input
          type="text"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.handlePassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login
