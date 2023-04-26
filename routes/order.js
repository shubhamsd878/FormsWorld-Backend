const router = require('express').Router()
const order = require('../models/orders')


// ----------------- route for fetching orders -----------------------
router.get('/', async(req, res)=> {
    let result = await order.find()
        .populate('form_id uid')
        .catch(err => res.status(500).json({message:false, err }))

    res.status(200).json({message:true, result})
})


// ----------------- route for adding posts --------------------------
router.post('/', (req, res)=> {
    const {form_id, uid, payment_done} = req.body

    dateTime = Date.now()

    let newOrder = new order({
        form_id,
        uid, 
        dateTime, 
        payment_done
    })

    newOrder.save((err, resp) => {
        if(err) return res.status(500).json({message:false, err })
        console.log('newOrder saved successfully')
        res.status(200).json({message:true, resp})
    })
})



module.exports = router