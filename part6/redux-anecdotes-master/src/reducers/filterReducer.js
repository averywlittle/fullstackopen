const initialState = ''

const reducer = (state = initialState, action) => {
    console.log('state', state)
    switch (action.type) {
        case 'SET_FILTER': {
            return action.data.content
        }
        default: return state
    }
}

export const setFilter = (content) => {
    console.log('reducer content', content)
    return {
        type: 'SET_FILTER',
        data: { content }
    }
}

export default reducer