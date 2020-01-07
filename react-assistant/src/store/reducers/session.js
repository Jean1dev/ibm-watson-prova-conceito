const INITIAL_STATE = {
    context: null
}

export default function sessionInit(state = INITIAL_STATE, action) {
    if (action.type === 'WATSON_SESSION') return { context: action.context }
    return state
}