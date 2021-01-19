import blogService from '../services/blogs'
import loginService from '../services/login'

// Logic where we update state
// Must be pure functions
const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USER': {
            return action.data
        }
        case 'LOGOUT_USER': {
            return null
        }
        case 'LOGIN_USER': {
            return action.data
        }
        default: return state
    }
}

export const initUser = () => {

    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'INIT_USER',
                data: user
            })
        }
    }
}

export const loginUser = ({username, password}) => {

    return async dispatch => {
        const user = await loginService.login({
            username, password
        })

        if (user.status === 401) {
            return('Wrong credentials')
        } else {
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch({
                type: 'LOGIN_USER',
                data: user
            })
        }
    }
}

export const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')

    return async dispatch => {
        dispatch({
            type: 'LOGOUT_USER',
            data: null
        })
    }
}

export default reducer