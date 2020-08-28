const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema(
{
    email: 
    {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate(value)
        {
            if(!validator.isEmail(value))
                throw new Error('Please enter a valid email')
        }
    },
    password: 
    {
        type: String,
        trim:true,
        required: true
    },
    tokens:
    [{
        token:
        {
            type: String,
            required: true
        }
    }]

})

const User = mongoose.model('User', userSchema)

module.exports = User