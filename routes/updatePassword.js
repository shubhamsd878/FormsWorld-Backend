const router = require('express').Router()
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

// const JWT_SECRET = process.env.JWT_SECRE
const JWT_SECRET = 'shh_this_is_secret'

router.post('/', (req, res) => {
    const auth = req.headers.authtoken
    const newPassword = req.body.newPassword
    console.log('newPassword: ' + newPassword)
    console.log('auth: ' + auth)
    
    if (!auth || !newPassword) {
        // console.log('no auth token')
        return res.status(500).json({ message: false, err: "authtoken or newPassword are invalid!" })
    }
    
    
    const decoded = jwt.decode(auth, JWT_SECRET)
    const uid = decoded.uid
    console.log('id: ' + uid)

    userModel.findByIdAndUpdate(uid, { password: newPassword }, { upsert: true }, (errr, result) => {
        if (errr) return res.status(500).json({ status: 500, message: 'something went wrong', errr })

        res.status(200).json({ status: 200, message: 'Password updated Successfully', result })
    })



    // bcrypt.hash(newPassword, saltRounds, function (err, hash) {
    //     if (err) return res.status(500).json({ message: false, err })

    //     userModel.findByIdAndUpdate(uid, { password: hash }, { upsert: true }, (errr, result) => {
    //         if (err) return res.status(500).json({ message: false, errr })

    //         res.status(200).json({ message: true, result })

    //     })

    // })

})

module.exports = router