import React from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { useRouteMatch } from 'react-router-dom'

const UserView = (props) => {

    const userById = (id) =>
        props.users.find(user => user.id === id)

    const match = useRouteMatch('/users/:id')
    
    const userMatch = match
        ? userById(match.params.id)
        : null

    return (
        <div>
            {userMatch ? userMatch.name : null}
            <h3>Blogs</h3>
            {userMatch ? userMatch.blogs.map(blog => <div key={blog.id}>{blog.title}</div>) : null}
        </div>
    )
}

const mapDispatchToProps = {
  showNotification
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}


const ConnectedUserView = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserView)
export default ConnectedUserView