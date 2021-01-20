import React from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import Blog from '../components/Blog'

const BlogView = (props) => {


    const likeBlog = async (blog) => {
        props.likeBlog(blog)
  
        props.showNotification(`You liked the blog: ${blog.title}`, 5)
      }
      
      const removeBlog = async (blog) => {
        props.removeBlog(blog.id)
  
        props.showNotification(`You removed the blog: ${blog.title}`, 5)
      }

    const blogById = (id) =>
        props.blogs.find(blog => blog.id === id)

    const match = useRouteMatch('/blogs/:id')
    const blogMatch = match
        ? blogById(match.params.id)
        : null
    return (
        <div>
            {blogMatch ? 
                <Blog blog={blogMatch} likeBlog={likeBlog} removeBlog={removeBlog}/>
                : null}
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
const ConnectedBlogView = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogView)
export default ConnectedBlogView