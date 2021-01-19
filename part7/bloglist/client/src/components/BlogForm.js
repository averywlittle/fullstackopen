import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    }

    props.addBlog(newBlog)

    props.showNotification(`You added the blog: ${newBlog.title}`, 5)
  }

  return (
    <div className="formDiv">
      <h2>add a new blog</h2>
      <form onSubmit={createBlog}>
        <div>
            title:
          <input
            type="text"
            value={blogTitle}
            name="Blog Title"
            id="blogTitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={blogAuthor}
            name="Blog Author"
            id="blogAuthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={blogURL}
            name="Blog URL"
            id="blogURL"
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>
        <button type="submit" className="blog-form-button">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  showNotification,
  addBlog
}

const ConnectedBlogForm = connect(
  null,
  mapDispatchToProps
)(BlogForm)
export default ConnectedBlogForm
