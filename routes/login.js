const router = require('express').Router()
const {body, validationResult} = require('express-validator')
const User = require('../models/user')

require('dotenv').config()

const jwt = require('jsonwebtoken')

// const JWT_SECRET = process.env.JWT_SECRE
const JWT_SECRET = 'shh_this_is_secret'

router.post('/',
[
    body('email').isEmail(),
    body('password').isLength({min: 5}),
], 
async (req, res) => {
    console.log('req.body: ' + req.body.email)
    console.log('req.body: ' + req.body.password)
    const error = validationResult(req)
    console.log('validationResult error : ' + validationResult)

    if(!error.isEmpty()){
        // console.log(' array of error: ')
        console.log(' array of error: ' + error.array())
        return res.status(404).json({message: 'enter valid credentials', 'error: ': error.array()})
    }

    // try {
        // res.send('hello from signup')

        console.log('from login')
        
        const userData = await User.findOne({email: req.body.email})

        if( !userData ){
            return res.status(404).json({status:404, message:"Invalid email"})
        }
        else if(userData.password != req.body.password){
            return res.status(404).json(({ status:404, message: "Invalid Password"}))
        }

        const data = {uid: userData._id, email: req.body.email, password: req.body.password}

        console.log("process.env.JWT_SECRE: " + process.env.JWT_SECRE)
        const authtoken = jwt.sign(data, JWT_SECRET)
        

        return res.status(200).json({status: 200,message:'successsss', token: authtoken, uid: userData._id})

})

module.exports = router