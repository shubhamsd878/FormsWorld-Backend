const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = Schema({
    name: {
        type: String,
        minLength: 3
    },
    email: {
        type: String,
        unique: true,
        minLength: 10,
    },
    password: {
        type: String,
        minLength: 5
    },
    phone_no: {
        type: Number,
        minLength: 10
    }

});

module.exports = mongoose.model('users', userSchema)