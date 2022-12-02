const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    form_id:{
        type: mongoose.Types.ObjectId,
        ref:'forms',
        required: true
    },
    uid: {
        type: mongoose.Types.ObjectId,
        ref:'users',
        required: true
    },
    dateTime:{
        type: Date,
        default: Date.now
    },
    payment_done:{
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('orders', orderSchema)