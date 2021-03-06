import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogURL
      }

      const savedBlog = await blogService.create(newBlog)
      if (savedBlog) {
        const newBlogList = blogs.concat(savedBlog)
        setBlogs(newBlogList)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogURL('')
        console.log('blogs', newBlogList)
      }

    } catch (exception) {
      console.error('create blog exception', exception)
    }
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

export default BlogForm
