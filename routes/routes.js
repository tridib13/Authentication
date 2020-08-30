const router = require('express').Router()
const User = require('../models/User')

router.post('/signup/', async (req, res) => 
{
    const existingUser = await User.find({email: req.body.email})
    
    if(existingUser.length)
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

module.exports = router