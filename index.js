const express = require('express')
const cors = require('cors')
const connectMongo = require('./db')
var bodyParser = require('body-parser')
// const Razorpay = require('razorpay')
// import Razorpay from "razorpay";        // for Razorpay

const app = express()
const port = 3001

const dotenv = require('dotenv');
dotenv.config()

connectMongo()


app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_APT_SECRET,
// });


app.use('/signup', require('./routes/signup'))
app.use('/login', require('./routes/login'))
app.use('/updatePassword', require('./routes/updatePassword'))
app.use('/kyc', require('./routes/kyc'))
app.use('/admin', require('./routes/admin'))
app.use('/forms', require('./routes/forms'))
app.use('/order', require('./routes/order'))
app.use('/otp', require('./routes/sendOtp'))
app.use('/payment', require('./routes/paymentRoute'))
app.use('/payment/getKey', (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
)



app.listen(port, ()=> console.log(`app listening at localhost:${port}`))