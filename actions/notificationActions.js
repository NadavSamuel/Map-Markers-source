
export function setNotification(kind, txt, isAliveNotification = false) {
    if (isAliveNotification) {
        return dispatch => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
            setTimeout(() =>{
                dispatch({ type: 'SET_NOTIFICATION', kind, txt })
            },10)
        }
    }
    return dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', kind, txt })
    }
}

export function clearNotification() {
    return dispatch => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
    }
}