import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [comment, setComment] = useState('')

  const blogStyle = { margin: '10px', padding: '2px' }

  const addComment = (event) => {
    event.preventDefault()
    const newComment = {
      content: comment,
      blogId: props.blog.id
    }
    props.addComment(newComment)
    setComment('')

    props.showNotification(`You commented: ${newComment.content}`, 5)
  }


  return (
    <div style={blogStyle} className='blog'>

      <div>
        <h2>{props.blog.title} {props.blog.author}</h2>
        <div>{props.blog.url}</div>
        <div>likes: {props.blog.likes} <button className="blog-like-button" onClick={() => props.likeBlog(props.blog)}>like</button></div>
        <div>{props.blog.user.name}</div>
        <button style={ { background: 'red' } } className="blog-delete-button" onClick={() => props.removeBlog(props.blog)}>remove</button>
      </div>
      <div>
        <form onSubmit={addComment}>
          <label>
            Add a comment:
            <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h3>comments</h3>
        <ul>
          {props.blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
        </ul>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  addComment,
  showNotification
}

const ConnectedBlog = connect(
  null,
  mapDispatchToProps
)(Blog)
export default ConnectedBlog
