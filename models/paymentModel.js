const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  // razorpay_order_id: {
  //   type: String,
  //   required: true,
  // },
  // razorpay_payment_id: {
  //   type: String,
  //   required: true,
  // },
  // razorpay_signature: {
  //   type: String,
  //   required: true,
  // },

  // ----- new -----
  order_id: {
    type: mongoose.Types.ObjectId,
    ref: 'orders',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model("Payment", paymentSchema);