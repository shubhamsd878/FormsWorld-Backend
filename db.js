const mongoose = require('mongoose')
// const monogURI = 'mongodb://localhost:27017/formsworld'
const monogURI = process.env.MONGO_URI

const connectMongo = async () => {
    await mongoose.connect(process.env.MONGO_URI, ()=> 
        console.log('connected to db')
    )
    .catch(err => console.log('error while connecting db: ' + err ))
}

module.exports = connectMongo