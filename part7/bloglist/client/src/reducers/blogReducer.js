import blogService from '../services/blogs'

// Logic where we update state
// Must be pure functions
const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOG': {
            return action.data
        }
        case 'ADD_BLOG': {
            return state.concat(action.data)
        }
        case 'LIKE_BLOG': {
            const id = action.data.id
            const changedBlog = action.data
            return state.map(blog => 
                blog.id !== id ? blog : changedBlog
            )
        }
        case 'ADD_COMMENT': {
            const blogId = action.data.blog
            const blogToUpdate = state.find(blog => blog.id === blogId)
            blogToUpdate.comments.push(action.data)
            
            return state.map(blog => 
                blog.id !== blogId ? blog : blogToUpdate
            )
        }
        case 'REMOVE_BLOG': {
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
            type: 'LIKE_BLOG',
            data: updatedBlog
        })
    }
}

export const addComment = ({ content, blogId }) => {

    return async dispatch => {
        console.log('content', content)
        const savedComment = await blogService.createComment(content, blogId)
        if (savedComment) {
            dispatch({
                type: 'ADD_COMMENT',
                data: savedComment
            })
        }
    }
}

export const addBlog = (newBlog) => {
    
    return async dispatch => {
        const savedBlog = await blogService.create(newBlog)
        if (savedBlog) {
            dispatch({
                type: 'ADD_BLOG',
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
                type: 'REMOVE_BLOG',
                data: id
            })
        } else {
            dispatch({
                type: 'FAILED_BLOG',
                data: id
            })
        }
    }
}

export const initBlogs = () => {

    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export default reducer