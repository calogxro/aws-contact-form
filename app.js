const express = require('express')
const app = express()

const config = require('./config.json')

//If the data was sent as JSON, using Content-Type: application/json, 
//you will use the express.json() middleware:
//app.use(express.json())

//If the data was sent using Content-Type: application/x-www-form-urlencoded, 
//you will use the express.urlencoded() middleware:
app.use(express.urlencoded({extended: true}))

app.get('/test', function(req, res) {
  res.send('Hello World!')
})

app.get('/test/:msg', function(req, res) {
  if (req.params.msg === 'ok') {
    res.redirect(config.msg_sent_ok_url)
  }
  else {
    res.redirect(config.msg_sent_ko_url)
  }
})

app.post('/', function(req, res) {
  const sendEmail = require('./send-email')

  const name = req.body.name
  const email = req.body.email
  const message = req.body.message

  sendEmail(name, email, message)
  .then(data => {
    console.log(data.MessageId)
    res.redirect(config.msg_sent_ok_url)
  })
  .catch(err => {
    console.error(err, err.stack)
    res.redirect(config.msg_sent_ko_url)
  })
})

module.exports = app
