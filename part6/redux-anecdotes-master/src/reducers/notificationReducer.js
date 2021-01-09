const initialState = ''

const reducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'SHOW_NOTIFICATION': {
            return action.data.content
        }
        case 'HIDE_NOTIFICATION':
            return ''
        default: return state
    }
}

export const showNotification = (content) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: { content }
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default reducer