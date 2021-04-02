require('dotenv').config();

const AWS = require('aws-sdk');

const SESConfig = {
  apiVersion: 'latest',
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: 'us-west-2',
};

//the following line was missing from the Medium tutorial:
const AWS_SES = new AWS.SES(SESConfig);

let sendEmail = () => {
  const params = {
    Source: 'henrylightfoot@gmail.com',
    Destination: {
      ToAddress: ['henrylightfoot@gmail.com'],
    },
    ReplyToAddresses: ['henrylightfoot@gmail.com'],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: 'Welcome to the year 2000',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test Email from Amazon SES',
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

// the following code is from the Medium and Amazon tutorials...

// const sendEmail =
//   (params,
//   function (err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log(data);
//   });

// new AWS.SES(SESConfig)
//   .sendEmail(params)
//   .promise()
//   .then((res) => {
//     console.log(res);
//   });

module.exports = {
  sendEmail,
};
