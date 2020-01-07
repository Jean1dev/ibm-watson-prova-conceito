const URL_CREATE_SESSION = 'https://us-central1-testes-chatbot-7b610.cloudfunctions.net/createSession'
const URL_SEND_WATSON = 'https://us-central1-testes-chatbot-7b610.cloudfunctions.net/sendToWatson'
const LOCAL_URL_CREATE_SESSION = 'http://localhost:5000/testes-chatbot-7b610/us-central1/createSession'
const LOCAL_URL_SEND_WATSON = 'http://localhost:5000/testes-chatbot-7b610/us-central1/sendToWatson'

export const CREATE_SESSION = process.env.NODE_ENV === "development" ? LOCAL_URL_CREATE_SESSION : URL_CREATE_SESSION
export const SEND_WATSON = process.env.NODE_ENV === "development" ? LOCAL_URL_SEND_WATSON : URL_SEND_WATSON