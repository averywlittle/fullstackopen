import React from 'react'
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

export default Login
