const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 2000
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/tasks', require('./routes/tasks'))

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

function init () {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
  })
}

mongoose.connect(process.env.MONGO_SERVER, mongooseConfig)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('mongoose connected!')
  init()
})
