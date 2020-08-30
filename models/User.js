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
        trim: true,
        required: true
    },
    tokens:
    [
        {
            token:
            {
                type: String,
                required: true
            }
        }
    ]

})

//before saving hash the password
userSchema.pre('save', async function(next)
{
    const user = this

    user.password = await bcrypt.hash(user.password, 8)
    
    next()
})

userSchema.statics.findByCredentials = async (email, password) =>
{
    const user = await User.findOne({email})
    
    if(!user)
        return {error: 'No such user'}

    const isMatch = await bcrypt.compare(password, user.password)
    
    if(isMatch)
        return user
}

const User = mongoose.model('User', userSchema)

module.exports = User