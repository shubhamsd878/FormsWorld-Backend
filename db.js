const mongoose = require('mongoose')
// const monogURI = 'mongodb://localhost:27017/formsworld'
const monogURI = 'mongodb://127.0.0.1:27017/formsworld'

const connectMongo = async () => {
    await mongoose.connect(monogURI, ()=> 
        console.log('connected to db')
    ).catch(err => console.log('error while connecting db: ' + err ))
}

module.exports = connectMongo