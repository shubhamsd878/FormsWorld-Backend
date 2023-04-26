const router = require('express').Router()
const nodemailer = require('nodemailer')

// for phone otp -- from fast2sms
const unirest = require("unirest"); 

// require('dotenv').config()
// function for generating 6-digit otp
const generateOtp = () => {
    var minm = 100000;
    var maxm = 999999;
    
    return Math.trunc( Math.random() * (maxm - minm + 1) + minm );
}


// variables for mail-html
const LINK='https://formsworld-d2cf8.web.app'
const BRAND='Forms World'
const ADDRESS='Kalupur Chungi, Sonipat'
const CITY='Sonipat'



router.post('/email', (req, res) => {

    const targetEmail = req.body.email
    const myEmail = process.env.email
    const myPassword = process.env.password
    
    console.log('body: \n' + JSON.stringify(req.body) )
    if( !targetEmail ){
        console.log('no email: ' + targetEmail)
        return res.status(404).json({status:404, message:'no/invalid email id'})
    }
    
    
    //generating otp
    const otp = generateOtp()
    console.log(otp)

    
    // for sending mail
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: myEmail,
            pass: myPassword
        }
    })
    

    var mailOptions = {
        // from: 'youremail@gmail.com',
        from: myEmail,
        to: targetEmail,
        subject: 'FormsWorld OTP',
        // text: 'That was easy!'
        html: 
        `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <a href=${LINK} style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${BRAND}</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
            <p style="font-size:0.9em;">Regards,<br />${BRAND}</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>${BRAND} Inc</p>
                <p>${ADDRESS}</p>
                <p>${CITY}</p>
            </div>
            </div>
        </div>`
    };
    

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

            return res.status(200).json({status:200, message:'otp sent successfully', otp})
        }
    });

})


// function from fast2sms_api

const fast2sms_api = (API_KEY, phone, otp) => {
    var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

    req.headers({
        "authorization": `${API_KEY}`
    });

    req.form({
        "variables_values": `${otp}`,
        "route": "otp",
        "numbers": `${phone}`,
    });

    req.end(function (res) {
        if (res.error) {
            console.log('res: \n' + JSON.stringify(res))
            throw new Error(res.error)
        };

        return res.body;
    });
}


// route for sending otp sms
router.use('/phone', async (req, res) => {
    const API_KEY = process.env.FAST2SMS_API_KEY
    // console.log(API_KEY)
    const phone = req.body.phone
    if( !phone ){
        console.log('no phone number')
        return res.status(400).json({status:400, message:'no/invalid number'})
    }

    //generate otp
    const otp = generateOtp()

    const response = fast2sms_api(API_KEY, phone, otp)

    console.log(JSON.stringify(response))

    res.status(200).json(response)


    // let response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
    //     method:'POST',
    //     headers:{
    //         "authorization": API_KEY
    //     },
    //     body: JSON.stringify({
    //         variable_values: otp,
    //         route: "otp",
    //         numbers: phone
    //     })
    // })

    // response = await response.json()
    // console.log('response: \n' + JSON.stringify(response))


})


module.exports = router