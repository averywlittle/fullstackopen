import React from 'react'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Users = (props) => {

    console.log('props', props)
    return (
        <div>
            {props.users.map(user => <p key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link> Blogs: {user.blogs.length}</p>)}
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

const ConnectedUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
export default ConnectedUsers