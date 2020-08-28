const express = require('express')
const mongo_connection = require('./models/mongoose')

const app = express()

app.listen(4000, () => (console.log('Connected to server')))
