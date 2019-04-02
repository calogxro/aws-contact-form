const config = require('./config.json')

module.exports = function(contactName, contactEmail, contactMessage) {
  const myEmailAddress = config.email

  const emailSource = myEmailAddress
  const emailDestination = myEmailAddress

  const emailSubject = 'Contact Form | ' + contactName + ' sent you a message'
  const emailBody = contactMessage + '\n\n' 
  + '---' + '\n'
  + 'From: ' + contactName + ' <' + contactEmail + '>' + '\n'
  + 'To: ' + config.domain

  // Load the AWS SDK for Node.js
  const AWS = require('aws-sdk')
  // Set the region 
  AWS.config.update({region: 'eu-west-1'})

  // Create sendEmail params 
  const params = {
    Source: emailSource,
    Destination: { ToAddresses: [ emailDestination ] },
    Message: {
      Body: { 
        Text: { Charset: "UTF-8", Data: emailBody }
      },
      Subject: { Charset: 'UTF-8', Data: emailSubject }
    }
  }

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

  return sendPromise
}