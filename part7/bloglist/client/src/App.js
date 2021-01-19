import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { initUser, logoutUser } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = (props) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(initUser())
  }, [])

  const handleLogout = () => {
    props.logoutUser()
  }

  const userLoggedIn = () => {
    if (props.user === null) return false
    if (props.user.length === 0) return false
    if (props.user.token) return true
    else return false
  }

  const blogData = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <p>{props.user.name} logged in</p><button onClick={() => handleLogout()}>logout</button>

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
      {!userLoggedIn() && <Login />}
      {userLoggedIn() && blogData()}
    </div>
  )
}

const mapDispatchToProps = {
  initBlogs,
  initUser,
  logoutUser
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
export default ConnectedApp