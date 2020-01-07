require('dotenv').config({ silent: true });
const functions = require('firebase-functions');
const AssistantV2 = require('ibm-watson/assistant/v2'); // watson sdk
const { IamAuthenticator } = require('ibm-watson/auth');
const assistantId = process.env.ASSISTANT_ID
const cors = require('cors')({ origin: true })

const assistant = new AssistantV2({
    version: '2019-02-28',
    authenticator: new IamAuthenticator({
        apikey: process.env.ASSISTANT_IAM_APIKEY || 'no have',
    }),
    url: process.env.ASSISTANT_URL,
});

exports.sendToWatson = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let payload = {
            assistantId: assistantId,
            sessionId: req.body.session_id,
            input: {
                message_type: 'text',
                text: req.body.message || '',
            },
        };

        assistant.message(payload, function (err, data) {
            if (err) {
                const status = err.code !== undefined && err.code > 0 ? err.code : 500;
                return res.status(status).json(err);
            }

            return res.json(data);
        });
    })
})

exports.createSession = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        assistant.createSession({ assistantId }, function (error, response) {
            if (error) {
                return res.send(error);
            } else {
                return res.send(response);
            }
        })
    })
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions