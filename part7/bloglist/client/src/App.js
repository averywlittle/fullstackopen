import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import { initUser, logoutUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import { initBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import {
  Switch, Route, Link
} from 'react-router-dom'

const App = (props) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(initUser())
  }, [])

  useEffect(() => {
      dispatch(initUsers())
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
        <div style={hideWhenVisible}>
          <button className="toggle-blog-open" onClick={() => setBlogFormVisible(true)}>add blog</button>
        </div>

        <div style={showWhenVisible}>
          <BlogForm />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
        <h2>blogs</h2>
        <BlogList />
      </div>
    )
  }

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link to='/' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
      </div>
    )
  }

  const siteHeader = () => {
    return (
      <div>
        <h2>Blog List App</h2>
        <div>
          <Menu />
        </div>
        <div>
          {props.user.name} logged in
          <button onClick={() => handleLogout()}>logout</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {userLoggedIn() && siteHeader()}
      {userLoggedIn() && <Notification />}
      
      <Switch>
        <Route path="/users/:id">
          {!userLoggedIn() && <Login />}
          {userLoggedIn() && <UserView />}
        </Route>
        <Route path="/users">
          {!userLoggedIn() && <Login />}
          {userLoggedIn() && <Users />}
        </Route>
        <Route path="/blogs/:id">
          {!userLoggedIn() && <Login />}
          {userLoggedIn() && <BlogView />}
        </Route>
        <Route path="/">
          {!userLoggedIn() && <Login />}
          {userLoggedIn() && blogData()}
        </Route>
      </Switch>
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