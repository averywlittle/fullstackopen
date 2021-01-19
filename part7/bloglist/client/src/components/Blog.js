import React, { useState } from 'react'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const blogStyle = { border: 'thin solid', margin: '2px', padding: '2px' }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button className="show-blog-details-button" onClick={() => setBlogInfoVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setBlogInfoVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button className="blog-like-button" onClick={() => likeBlog(blog)}>like</button></div>
        <div>{user}</div>
        <button style={ { background: 'red' } } className="blog-delete-button" onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
