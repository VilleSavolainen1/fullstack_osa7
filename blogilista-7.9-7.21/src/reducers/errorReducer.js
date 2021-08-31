const errorReducer = (state = null, action) => {
    switch (action.type) {
    case 'error':
        return action.message
    case 'hide':
        return null
    default:
        return state
    }
}

let timeoutID = undefined

export const setErrorNotification = (message, duration) => {
    return async dispatch => {
        if (typeof timeoutID === 'number') {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            dispatch(hideNotification())
        }, duration * 1000)

        dispatch({
            type: 'error',
            message: message
        })
    }
}

export const hideNotification = () => {
    return {
        type: 'hide'
    }
}

export default errorReducer