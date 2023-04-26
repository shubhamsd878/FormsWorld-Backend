const router = require('express').Router()
const form = require('../models/form')

router.post('/', (req, res) => {

    console.log('title: ', req.body.title)
    console.log('last date: ', new Date(req.body.date))
    console.log('total post: ', req.body.total_post)
    console.log('description: ', req.body.description)

    try {

        const newForm = new form({
            title: req.body.title,
            last_date: new Date(req.body.date),
            total_post: req.body.total_post,
            age: req.body.age,
            qualification: req.body.qualification,
            price: req.body.price
        })

        newForm.save((err, f) => {
            if (err)
                res.json({ message: 'something went wrong, error is \n: ', err })
            else
                res.json({ message: 'form succesfully saved, \n', f })
        })


        console.log('----------------------------')

    } catch (error) {
        console.log('\bfrom try_catch, somtehing went wrong, error is \n', error)
    }
})


router.get('/', async (req, res) => {
    // form.find( (err, response)=> {
    //     if(err)
    //     res.json({message:'somthing went wrong, error is ', err})
    //     else {
    //         res.json({message:"cool", response})
    //     }
    // })
    const results = await form.find({})
    res.status(200).json({message:"successful", results})
})

router.get('/_id', (req, res)=> {
    const fid = req.headers.fid
    if( !fid ) return res.status(400).json({message:'no form id'})

    form.findById(fid, (err, result) => {
        res.status(200).json({message:'form fetch successful', result})
    })
})

router.delete('/', (req,res)=> {
    form.findByIdAndRemove( req.body.id, (err, response)=>{
        if(err)
            res.json({message: 'error is: ', err})
        else 
            res.json({message:'removed successfully: ', response})
    })
})

router.put('/', (req, res)=>{
    const updateForm = {
        title: req.body.title,
        last_date: new Date(req.body.date),
        total_post: req.body.total_post,
        description: req.body.description
    }

    form.findByIdAndUpdate(req.body.id, updateForm, (err, response)=> {
        if(err) 
            res.json({message:'error is: ', err})
        else
            res.json({message: 'updated successfully', response})
    })
})

module.exports = router