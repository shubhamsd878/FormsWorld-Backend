const router = require('express').Router()
const formidableMiddleware = require('express-formidable');

router.use(formidableMiddleware({
    multiples : true
 }));

router.post('/', (req, res) => {

    console.log('********************* Admin login **************')

    let username = req.fields.username;
    let password = req.fields.password;
    console.log('req.body.username: ' + username)
    console.log('req.body.password: ' + password)

    // !!!!!!!!!!!!!!!!!!!  need to place them in env file !!!!!!!!!!!!!!!!!!!!!!!

        if( username == 'admin' || password == 'admin' ){
            return res.status( 200 ).json({ status: 200, message:"login successful"})
        }

        return res.status(404).json(({ message: " Invalid usename or password "}))
        
})

module.exports = router