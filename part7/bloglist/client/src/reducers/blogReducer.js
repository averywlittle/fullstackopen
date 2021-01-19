import blogService from '../services/blogs'

// Logic where we update state
// Must be pure functions
const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT': {
            return action.data
        }
        case 'ADD': {
            return state.concat(action.data)
        }
        case 'LIKE': {
            const id = action.data.id
            const changedBlog = action.data
            return state.map(blog => 
                blog.id !== id ? blog : changedBlog
            )
        }
        case 'REMOVE': {
            const id = action.data
            return state.filter(blog => blog.id !== id)
        }
        default: return state
    }
}

export const likeBlog = (blog) => {

    return async dispatch => {
        const blogToUpdate = {
            ...blog,
            likes: blog.likes + 1
        }
        const updatedBlog = await blogService.update(blogToUpdate, blog.id)
        dispatch({
            type: 'LIKE',
            data: updatedBlog
        })
    }
}

export const addBlog = (newBlog) => {
    
    return async dispatch => {
        const savedBlog = await blogService.create(newBlog)
        if (savedBlog) {
            dispatch({
                type: 'ADD',
                data: savedBlog
            })
        }
    }
}

export const removeBlog = (id) => {

    return async dispatch => {
        const removeStatus = await blogService.remove(id)
        if (removeStatus === 204) {
            dispatch({
                type: 'REMOVE',
                data: id
            })
        } else {
            dispatch({
                type: 'FAILED',
                data: id
            })
        }
    }
}

export const initBlogs = () => {

    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export default reducer