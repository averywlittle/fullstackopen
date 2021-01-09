const initialState = ''

const reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'SHOW_NOTIFICATION': {
            return action.data
        }
        case 'HIDE_NOTIFICATION':
            return ''
        default: return state
    }
}




export const showNotification = (content, time) => {
    return async dispatch => {

        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, time * 1000)
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default reducer