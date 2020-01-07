const INITIAL_STATE = {
    messages: [],
    orign: null
}

export default function chat(state = INITIAL_STATE, action) {
    if (action.type === 'SEND_MESSAGE') {
        return {
            messages: [...state.messages, action.payload.message]
        }
    }
    return state
}