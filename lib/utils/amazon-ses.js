// const twilio = require('twilio');

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // twilioClient.messages.create -> Promise<to send an SMS>
// const sendSms = (to, message) => {
//   return twilioClient.messages.create({
//     body: message,
//     from: process.env.TWILIO_NUMBER,
//     to,
//   });
// };

// module.exports = {
//   sendSms,
// };

require('dotenv').config();

const AWS = require('aws-sdk');

const SESConfig = {
    apiVersion: '',
    accessKeyId: process.env.,
    secretAccessKey: process.env,
    // region: process.env
};

const params = {
    Source: '',
    Destination: {
        ToAddress: []
    },
    ReplyToAddresses: [],
    Message: {
        Body: {
            Html: {
                Charset: 'UTF-8',
                Data: 'IT IS <strong>WORKING</strong>'
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: 'Node + SES Example'
        }
    }
};

new AWS.SES(SESConfig).sendEmail(params).promise().then((res) => {
    console.log(res);
});

