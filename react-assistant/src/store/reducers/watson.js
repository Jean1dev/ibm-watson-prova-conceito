const INITIAL_STATE = {
    load: false,
    error: false,
    detailError: null,
    response: null,
    context: null
}

export default function watsonTalks(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'WATSON_REQUEST':
            return {
                load: true,
                error: false,
                detailError: null,
                response: null,
                context: null
            }

        case 'WATSON_REQUEST_SUCCESS':
            return {
                load: false,
                error: false,
                detailError: null,
                response: action.response,
                context: null
            }

        case 'WATSON_REQUEST_ERROR':
            return {
                load: false,
                error: true,
                detailError: action.details,
                response: null,
                context: null
            }

        case 'WATSON_REQUEST_ERROR':
            return {
                load: false,
                error: true,
                detailError: action.details,
                response: null,
                context: null
            }

        case 'WATSON_SESSION':
            return {
                load: false,
                error: true,
                detailError: null,
                response: null,
                context: action.context
            }

        default: return state
    }
}