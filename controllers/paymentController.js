//// import { instance } from "../index.js";
// import crypto from "crypto";
// import { Payment } from "../models/paymentModel.js";

const crypto = require('crypto')
const Payment = require('../models/paymentModel.js')
const Razorpay = require('razorpay')


const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});


const checkout = async (req, res) => {

  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  }
  catch (err) {
    console.log('err: ')
    console.log(JSON.stringify(err))
    res.status(500).json({ success: false })
  }
};


// --------------------------------------------------------------------------------------------------


const paymentVerification = async (req, res) => {
  try {


    const { amount, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here

      const data = await Payment.create({
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      // console.log(data)
      res.status(200).json({status:200, message:'payment successfully stored to db', data})
    } else {
      res.status(400).json({
        success: false,
      });
    }

  } catch (err) {
    console.log('err: ')
    console.log(JSON.stringify(err))
    res.status(500).json({ success: false })
  }
};


module.exports = { checkout, paymentVerification }