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
    console.log('req.body: ' + req.body.name)
    console.log('req.body: ' + req.body.email)
    console.log('req.body: ' + req.body.password)
    const error = validationResult(req)
    console.log('validationResult error : ' + validationResult)
    if(!error.isEmpty()){
        console.log(' array of error: ' + error.array())
        return res.status(404).json({status: 404, message: 'enter valid credentials', 'error: ': error.array()})
    }

    try {
        // res.send('hello from signup')
        console.log('request entered signup')

        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        console.log('newUser successfully created !')
        console.log("newuser: " + newUser)

        await newUser.save().then(()=> console.log('newUser saved successfully'))

        res.status(200).json({status: 200, message: 'Signup Successful'});
        
    } catch (e) {
        console.log(e.message)
    }
})

module.exports = router