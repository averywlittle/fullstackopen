import React from 'react'
import { connect } from 'react-redux'
import Blog from '../components/Blog'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogList = (props) => {

    const likeBlog = async (blog) => {
      props.likeBlog(blog)

      props.showNotification(`You liked the blog: ${blog.title}`, 5)
    }
    
    const removeBlog = async (blog) => {
      props.removeBlog(blog.id)

      props.showNotification(`You removed the blog: ${blog.title}`, 5)
    }

    return (
        <div className="blog-list">
            {props.blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} user={blog.user.name} likeBlog={likeBlog} removeBlog={removeBlog} />
            )}
        </div>
    )
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  showNotification
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
export default ConnectedBlogList

