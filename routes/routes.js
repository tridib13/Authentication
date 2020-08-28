const router = require('express').Router()
const User = require('../models/User')

router.post('/signup/', (req, res) => 
{
    const user = new User(req.body)
    
    user.save()
})