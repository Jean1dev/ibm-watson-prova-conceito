import axios from 'axios'
import { SEND_WATSON } from '../../contants/url'

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
        const url = SEND_WATSON
        axios
            .post(url, { message: message, session_id: context })
            .then(data => dispatch(watsonRequestSuccess(data)))
            .catch(err => dispatch(watsonRequestError(err)))
    }
}