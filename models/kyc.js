const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const kycSchema = Schema({
    uid: mongoose.Types.ObjectId,
    full_name: String,
    aadhar_no: Number,
    // .... phone_no +  email remaining
    fathers_name: String,
    mothers_name: String,
    family_id: String,
    // images
    passport_image: String,
    signature_image: String,
    marksheet_10th: String,
    marksheet_12th: String,
    domicile_image: String,
    caste_certificate: String,
    left_thumb: String,
    right_thumb: String

});

module.exports = mongoose.model('kyc', kycSchema)