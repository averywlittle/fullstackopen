import React, { useState } from 'react'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none'}

  const blogStyle = { border: 'thin solid', margin: '2px', padding: '2px'}

  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setBlogInfoVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setBlogInfoVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
        <div>{user}</div>
        <button style={ { background: 'red' } } onClick={() => removeBlog(blog.id)}>remove</button>
      </div>
  </div>
  )
}

export default Blog
