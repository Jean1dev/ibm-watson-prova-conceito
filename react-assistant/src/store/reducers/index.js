import { combineReducers } from 'redux'
import chat from './chat'
import watson from './watson'
import session from './session'

const rootReducer = combineReducers({
    chat,
    watson,
    session
})

export default rootReducer