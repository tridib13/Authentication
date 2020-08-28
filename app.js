const express = require('express')
const mongo_connection = require('./models/mongoose')

const port = process.env.PORT || 4000

const app = express()

app.listen(4000, () => (console.log('Connected to server ' + port)))
