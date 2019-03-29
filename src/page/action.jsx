export const GET_MESSAGE = 'GET_MESSAGE'
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE'

const getMessage = (message) => ({
    type: GET_MESSAGE,
    message
})
const closeMessage = () => ({
    type: CLOSE_MESSAGE,
    message: ''
})
export function fetchCurrentMessage(message) {
    return function (dispatch) {
        dispatch(getMessage(message))
    }
}
export function fetchCloseMessage(event, reason) {
    return function (dispatch) {
        dispatch(closeMessage())
    }
}