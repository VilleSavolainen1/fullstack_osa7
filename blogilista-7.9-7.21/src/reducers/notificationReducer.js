const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'show':
        return action.message
    case 'hide':
        return null
    default:
        return state
    }
}

let timeoutID = undefined


export const setNotification = (message, duration) => {
    return async dispatch => {
        if (typeof timeoutID === 'number') {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            dispatch(hideNotification())
        }, duration * 1000)

        dispatch({
            type: 'show',
            message: message
        })
    }
}


export const hideNotification = () => {
    return {
        type: 'hide'
    }
}

export default notificationReducer