const SES = require('aws-sdk/clients/ses');
require('dotenv').config();

const SESConfig = {
  apiVersion: 'latest',
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: 'us-west-2',
};

const AWS_SES = new SES(SESConfig);

let sendEmail = (message) => {
  const params = {
    Source: process.env.USER_EMAIL,
    Destination: {
      ToAddresses: [process.env.USER_EMAIL],
    },
    ReplyToAddresses: [process.env.USER_EMAIL],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Nougat Fact Update',
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

module.exports = {
  sendEmail,
};
