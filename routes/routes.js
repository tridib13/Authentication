const router = require('express').Router()
const User = require('../models/User')

router.post('/signup/', async (req, res) => 
{
    const existingUser = await User.findOne({email: req.body.email})
    
    if(existingUser)
    {
        return res.send({error: 'User already exists!'})
    }

    const user = new User(req.body)

    try 
    {
        await user.save()
    } 
    catch (error) 
    {
        // console.log(error)
    }

    res.send(user)
})

router.post('/login/', async (req, res) => 
{
    const { email, password } = req.body

    const user = await User.findByCredentials(email, password)

    if(!user)
        return res.send({error: 'No such user exists' })

    user.generateAuthToken()

    res.send(user)
    
})

module.exports = router