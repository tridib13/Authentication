const router = require('express').Router()
const User = require('../models/User')
const auth = require('../middleware/auth')

router.post('/signup', async (req, res) => 
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

router.post('/login', async (req, res) => 
{
    const { email, password } = req.body

    const user = await User.findByCredentials(email, password)

    if(!user)
        return res.send({error: 'No such user exists' })

    user.generateAuthToken()

    res.send(user)
    
})

router.get('/profile', auth, async (req, res) =>
{
    res.send(req.user)
})

router.get('/logout', auth, async (req, res) => 
{
    const { user } = req
    const token = req.header('Authorization').replace('Bearer ', '')

    user.logout(token)

    res.send({'message': 'successfully logged out'})
})

module.exports = router