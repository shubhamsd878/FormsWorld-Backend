const router = require('express').Router()
const jwt = require('jsonwebtoken')
let kycSchema = require('../models/kyc')
const fs = require('fs')
const formidableMiddleware = require('express-formidable');

const JWT_SECRET = 'shh_this_is_secret'

router.use(formidableMiddleware({
    multiples : false
 }));


 router.get('/', (req, res)=> {
    const uid=req.headers.uid
    if(!uid) return res.status(400).json({message:'no uid'})

    kycSchema.findById(uid, (err, result) => {
        if( err) return res.status(500).json({message: 'something went wrong', err})

        res.status(200).json({messge:'fetch success', result})
    })
 })



router.post('/', (req, res) => {

    try {
        const token = req.headers.token
        if( !token)
            return res.status(400).json({message: 'no token'})

        const decoded = jwt.decode(token, JWT_SECRET)
        const uid = decoded.uid


        // if( !req.files.passport_image || !req.fields.full_name){
        //     return res.status(400).json({message : "upload all files"})
        // }


        // else
        {
            // var kyc = new kycSchema
            var kyc = {}

            
            kyc.full_name = req.fields.full_name

            kyc.aadhar_no = req.fields.aadhar_no
            kyc.fathers_name = req.fields.fathers_name
            kyc.mothers_name = req.fields.mothers_name
            kyc.family_id = req.fields.family_id

            if(req.files.passport_image){
                var passportimg_base64 = fs.readFileSync(req.files.passport_image.path, "base64")
                kyc.passport_image = passportimg_base64
            }

            if(req.files.signature_image){
                var signature_base64 = fs.readFileSync(req.files.signature_image.path, "base64")
                kyc.signature_image = signature_base64
            }

            if( req.files.marksheet_10th){
                var marksheet_10th_base64 = fs.readFileSync(req.files.marksheet_10th.path, "base64")
                kyc.marksheet_10th = marksheet_10th_base64
            }

            if(req.files.marksheet_12th){
                var marksheet_12th_base64 = fs.readFileSync(req.files.marksheet_12th.path, "base64")
                kyc.marksheet_12th = marksheet_12th_base64
            }

            if(req.files.domicile_image){
                var domicile_image_base64 = fs.readFileSync(req.files.domicile_image.path, "base64")
                kyc.domicile_image = domicile_image_base64
            }

            if(req.files.caste_certificate){
                var caste_certificate_base64 = fs.readFileSync(req.files.caste_certificate.path, "base64")
                kyc.caste_certificate = caste_certificate_base64
            }    

            if(req.files.left_thumb){
                var left_thumb_base64 = fs.readFileSync(req.files.left_thumb.path, "base64")
                kyc.left_thumb = left_thumb_base64
            }

            if(req.files.right_thumb){
                var right_thumb_base64 = fs.readFileSync(req.files.right_thumb.path, "base64")
                kyc.right_thumb = right_thumb_base64
            }




            // kyc.findByIdAndUpdate( uid,{}, {upsert:true}, function(err, Person){
            // kycSchema.updateOne( {_id:uid}, kyc,  function(err, Person){
            // kycSchema.updateOne( {uid}, kyc,{upsert:true},  function(err, Person){
            kycSchema.findByIdAndUpdate( uid, kyc,{upsert:true},  function(err, Person){
                if(err){
                    console.log('database error: ' + err)
                    return res.status(501).json({message: "Database error", err});
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