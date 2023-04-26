// import express from "express";
// import {
//   checkout,
//   paymentVerification,
// } from "../controllers/paymentController.js";

const express = require('express')
const checkout = require('../controllers/paymentController.js').checkout
const paymentVerification = require('../controllers/paymentController.js').paymentVerification


const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

// export default router;
module.exports = router