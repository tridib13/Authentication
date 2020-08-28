const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

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

userSchema.pre('save', async next =>
{
    const user = this

    user.password = await bcrypt.hash(user.password, process.env.BCRYPT_SECRET)

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User