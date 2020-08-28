const mongoose = require('mongoose')

mongoose.connect('', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (client, error) => {

    if(error)
        throw new Error(error)

    console.log('Connected to database')
})