import React from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {

  const blogStyle = { margin: '10px', padding: '2px' }

  return (
    <div style={blogStyle} className='blog'>

      <div>
        <h2>{blog.title} {blog.author}</h2>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button className="blog-like-button" onClick={() => likeBlog(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        <button style={ { background: 'red' } } className="blog-delete-button" onClick={() => removeBlog(blog)}>remove</button>
      </div>
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Blog
