const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const formSchema = Schema({
    title: String,
    last_date: Date,
    total_post: Number,
    description: String, // --> no need delete 
    age: Number,
    qualification: String,
    price: Number

})

module.exports = mongoose.model('forms', formSchema)