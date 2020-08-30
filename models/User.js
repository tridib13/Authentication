const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

    if(user.isModified('password'))
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

userSchema.methods.generateAuthToken = async function()
{
    let user = this

    const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET)
    
    user.tokens = user.tokens.concat({ token })
    
    await user.save()

    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User