const initialState = ''
// Ideally, you would store this in state probably
let timerId
let timerOn = false

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

// Sending multiple of these creates weird behavior in the notification
// The hide function will interrupt new notifications
// Need to get the return id, store it somewhere, and check for it before calling
// If found, just reset the timer
export const showNotification = (content, time) => {
    return async dispatch => {

        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: content
        })

        if (timerOn) {
            clearTimeout(timerId)
        }

        timerOn = true

        timerId = setTimeout(() => {
            timerOn = false
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, time * 1000)

        console.log("TIMER ID: ", timerId)
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export default reducer