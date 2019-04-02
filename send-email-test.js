const sendEmail = require('./send-email')

const name = 'Jim'
const email = 'jim@example.com'
const message = 'Hi, this is a test!'

sendEmail(name, email, message)
.then(data => {
  console.log(data.MessageId)
})
.catch(err => {
  console.error(err, err.stack)
})