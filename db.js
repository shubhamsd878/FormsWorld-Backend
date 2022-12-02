const mongoose = require('mongoose')
const monogURI = 'mongodb://localhost:27017/formsworld'

const connectMongo = () => {
    mongoose.connect(monogURI, ()=> 
        console.log('connected to db')
    )
}

module.exports = connectMongo