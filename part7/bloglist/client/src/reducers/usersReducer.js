import usersService from '../services/users'

// Logic where we update state
// Must be pure functions
const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USERS': {
            return action.data
        }
        default: return state
    }
}

export const initUsers = () => {

    return async dispatch => {
        const users = await usersService.getUsers()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

export default reducer