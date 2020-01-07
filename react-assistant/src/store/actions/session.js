import axios from 'axios'
import { CREATE_SESSION } from '../../contants/url'

const watsonSession = sessionId => {
    return {
        type: 'WATSON_SESSION',
        context: sessionId
    }
}

export const watsonInit = () => {
    return dispatch => {
        const url = CREATE_SESSION
        axios.get(url)
            .then(res => dispatch(watsonSession(res.data.result.session_id)))
    }
}