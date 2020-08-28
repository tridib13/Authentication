const mongoose = require('mongoose')

mongoose.connect('', {useCreateIndex, useNewUrlParser, useUnifiedTopology}, (client, error) => {

    if(error)
        throw new Error(error)

    console.log('Connected to database')
})