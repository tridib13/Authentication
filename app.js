require('dotenv').config()
const express = require('express')
const mongo_connection = require('./models/mongoose')
const router = require('./routes/routes')

const port = process.env.PORT || 4000

const app = express()
app.use(express.json())
app.use(router)

app.listen(4000, () => (console.log('Connected to server ' + port)))
