const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const formSchema = Schema({
    title: String,
    last_date: Date,
    total_post: Number,
    age: String,
    qualification: String,
    price: Number
    // + date

})

module.exports = mongoose.model('forms', formSchema)