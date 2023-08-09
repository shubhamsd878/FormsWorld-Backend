// const { toHaveErrorMessage } = require('@testing-library/jest-dom/dist/matchers')
const express = require('express')
const router = require('express').Router()
const {body, validationResult} = require('express-validator')
const User = require('../models/user')

router.post('/',
[
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('phone_no').isLength({min: 10})
], 
async (req, res) => {
    // console.log('req.body: ' + req.body.name)
    // console.log('req.body: ' + req.body.email)
    // console.log('req.body: ' + req.body.password)
    const error = validationResult(req)
    console.log('validationResult error : ' + validationResult)
    if(!error.isEmpty()){
        console.log(' array of error: ' + error.array())
        return res.status(404).json({status: 404, message: 'Enter valid credentials', 'error: ': error.array()})
    }

    try {
        // res.send('hello from signup')
        console.log('request entered signup')
        const em = await User.find({ email: req.body.email })
        if( em.length > 0 ){
            console.log('email already exists')
            return res.status(201).json({status:201, message: 'Email already registered' })
        }
        const ph = await User.find({ phone_no: req.body.phone_no })
        if( ph.length > 0 ){
            console.log('phone_no already exists')
            return res.status(201).json({status:201, message: 'Phone no. already registered' })
        }

        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            password: req.body.password
        })
        console.log('newUser successfully created !')
        console.log("newuser: " + newUser)

        await newUser.save().then(()=> console.log('newUser saved successfully with email: ' + req.body.email))

        res.status(200).json({status: 200, message: 'Signup Successful'});
        
    } catch (e) {
        console.log(e.message)
        console.log(e)
        res.status(501).json({status: 501, message: 'Something went wrong', e})
    }
})

module.exports = router