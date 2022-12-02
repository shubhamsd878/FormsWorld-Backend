const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const kycSchema = Schema({
    name: {
        type: String,
        minLength: 3
    },
    
    // img: {
    //     file_name: String,
    //     data: Buffer,
    //     content_type: String
    // }
    img: Buffer

});

module.exports = mongoose.model('kyc', kycSchema)