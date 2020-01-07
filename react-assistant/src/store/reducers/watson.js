const INITIAL_STATE = {
    load: false,
    error: false,
    detailError: null,
    response: null,
}

export default function watsonTalks(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'WATSON_REQUEST':
            return {
                load: true,
                error: false,
                detailError: null,
                response: null,
            }

        case 'WATSON_REQUEST_SUCCESS':
            return {
                load: false,
                error: false,
                detailError: null,
                response: action.response,
            }

        case 'WATSON_REQUEST_ERROR':
            return {
                load: false,
                error: true,
                detailError: action.details,
                response: null,
            }

        case 'WATSON_REQUEST_ERROR':
            return {
                load: false,
                error: true,
                detailError: action.details,
                response: null,
            }

        default: return state
    }
}