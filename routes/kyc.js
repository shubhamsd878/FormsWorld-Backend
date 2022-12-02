const router = require('express').Router()
let kycSchema = require('../models/kyc')
const fs = require('fs')
const formidableMiddleware = require('express-formidable');


router.use(formidableMiddleware({
    multiples : true
 }));

router.post('/', (req, res) => {

    try {
        if( !req.files.passportimage || !req.fields.username){
            return res.status(501).json({message : "upload all files"})
        }
        else{
            var kyc = new kycSchema

            const passportimage = req.files.passportimage
            console.log(passportimage)
            console.log(passportimage.path)
            console.log(passportimage.type)

            // var img = fs.readFileSync(passportimage.path)
            // var binary_img = img.toString('base64')

            // var final_img = {
            //     file_name: passportimage.name,
            //     data : binary_img,
            //     content_type : passportimage.type
            // }

            // kyc.name = req.fields.username
            // kyc.img = final_img

            kyc.img = passportimage

            kyc.save(function(err, Person){
                if(err){
                    console.log('database error')
                    return res.status(501).json({message: "Database error", type: "error"});
                }
                else{
                    console.log('saved successfully')
                    return res.status(200).json({message: " Successfully uploaded", type: "Success"});
                }
             });

        }
        
    } catch (error) {
        console.log("----------------------------Error occured: --------------------------\n error is: +\n", error)
    }

})

module.exports = router