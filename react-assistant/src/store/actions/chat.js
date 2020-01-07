export const sendMessage = message => {
    return {
        type: 'SEND_MESSAGE',
        payload: {
            message
        }
    }
}