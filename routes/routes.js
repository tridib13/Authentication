const router = require('express').Router()
const User = require('../models/User')

router.post('/signup/', async (req, res) => 
{
    const user = new User(req.body)

    try 
    {
        await user.save()
    } 
    catch (error) 
    {
        console.log(error)
    }

    console.log('saved')
    res.send(user)
})

module.exports = router