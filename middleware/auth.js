const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) =>
{   
    try 
    {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, process.env.SECRET)
    
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if(!user)
            throw new Error('Error in Authentication')

        req.user = user
        
        next()
    } 
    catch (e) 
    {
        res.status(401).send(e)
    }
    
}

module.exports = auth