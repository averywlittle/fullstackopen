import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import { initBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log('user', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('login exception', exception)

      setInvalid(true)
      setTimeout(() => setInvalid(false), 2000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleUsername = (username) => {
    setUsername(username)
  }

  const handlePassword = (password) => {
    setPassword(password)
  }

  const blogData = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <p>{user.name} logged in</p><button onClick={() => handleLogout()}>logout</button>

        <div style={hideWhenVisible}>
          <button className="toggle-blog-open" onClick={() => setBlogFormVisible(true)}>add blog</button>
        </div>

        <Notification />

        <div style={showWhenVisible}>
          <BlogForm />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
        <h2>blogs</h2>
        <BlogList />
      </div>
    )
  }

  return (
    <div>
      {user === null && <Login username={username} password={password} handleLogin={handleLogin} handleUsername={handleUsername} handlePassword={handlePassword} invalid={invalid}/>}
      {user !== null && blogData()}
    </div>
  )
}

export default App