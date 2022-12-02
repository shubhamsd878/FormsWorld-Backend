const express = require('express')
const cors = require('cors')
const connectMongo = require('./db')
var bodyParser = require('body-parser')

const app = express()
const port = 3001

connectMongo()

const dotenv = require('dotenv');
dotenv.config()

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/signup', require('./routes/signup'))
app.use('/login', require('./routes/login'))
app.use('/kyc', require('./routes/kyc'))
app.use('/admin', require('./routes/admin'))
app.use('/forms', require('./routes/forms'))
app.use('/order', require('./routes/order'))

app.listen(port, ()=> console.log(`app listening at localhost:${port}`))