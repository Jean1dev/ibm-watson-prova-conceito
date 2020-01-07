import axios from 'axios'

export const watsonSession = sessionId => {
    return {
        type: 'WATSON_SESSION',
        context: sessionId
    }
}

export const watsonRequest = () => {
    return {
        type: 'WATSON_REQUEST',
        load: true,
        error: false
    }
}

export const watsonRequestSuccess = response => {
    return {
        type: 'WATSON_REQUEST_SUCCESS',
        response: response,
        context: null,
        load: false,
        error: false
    }
}

export const watsonRequestError = err => {
    return {
        type: 'WATSON_REQUEST_ERROR',
        load: false,
        error: true,
        details: err
    }
}

export const watsonTalks = (message, context) => {
    return dispatch => {
        dispatch(watsonRequest())
        const url = 'https://us-central1-testes-chatbot-7b610.cloudfunctions.net/sendToWatson'
        axios
            .post(url, { message, session_id: context })
            .then(data => dispatch(watsonRequestSuccess(data)))
            .catch(err => dispatch(watsonRequestError(err)))
    }
}

export const watsonInit = () => {
    return dispatch => {
        const url = 'https://us-central1-testes-chatbot-7b610.cloudfunctions.net/createSession'
        axios.get(url)
            .then(data => {
                // let res = JSON.parse(http.response);
                // sessionId = res.result.session_id;
                console.log(data)
            })
    }
}