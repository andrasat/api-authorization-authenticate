const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000 || process.env.PORT

const app = express()

// App config

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/api-auth')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', ()=> {
  console.log('Mongoose connection established')
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Routes
let user = require('./routes/user')

app.use('/api', user)

// Server listen
app.listen(port)
console.log('Listening to port : '+port)