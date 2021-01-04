import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const likeBlog = async (blog) => {
    try {
      const newBlog = {
        user: blog.user,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      }
  
      const savedBlog = await blogService.update(newBlog, blog.id)
      if (savedBlog) {
        console.log('blog like', savedBlog)
        let newBlogList = [...blogs]
        const index = newBlogList.findIndex((blog) => { return blog.id === savedBlog.id ? true : false })

        if (index !== -1) {
          newBlogList[index] = savedBlog
          setBlogs(newBlogList)
        }
      }
  
    } catch (exception) {
      console.error('like blog exception', exception)
    }
  }

  const removeBlog = async (id) => {
    try {
  
      const removeStatus = await blogService.remove(id)
      if (removeStatus === 204) {
        console.log('returned status', removeStatus)
        
        const newBlogList = [...blogs]
        
        const updatedBlogList = newBlogList.filter((blog) => { return blog.id === id ? false : true })

        setBlogs(updatedBlogList)
      }
  
    } catch (exception) {
      console.error('remove blog exception', exception)
    }
  }

  const blogData = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none'}
    
    return (
    <div>
      <p>{user.name} logged in</p><button onClick={() => handleLogout()}>logout</button>
      
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>add blog</button>
      </div>

      <div style={showWhenVisible}>
        <BlogForm blogs={blogs} setBlogs={setBlogs}/>
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
      <h2>blogs</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user.name} likeBlog={likeBlog} removeBlog={removeBlog}/>
        )}
    </div>
    )
  }

  return (
    <div>
      {user === null && <Login username={username} password={password} handleLogin={handleLogin} handleUsername={handleUsername} handlePassword={handlePassword}/>}
      {user !== null && blogData()}
    </div>
  )
}

export default App