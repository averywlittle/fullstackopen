import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = (props) => {

    return (
        <div className="blog-list">
            {props.blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <div key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedBlogList = connect(
  mapStateToProps,
  null
)(BlogList)
export default ConnectedBlogList

