const express = require('express')
const UserSchema1 = require('../models/User')
const router = express.Router()

router.get('/',(req, res)=>{
    console.log(req.body)
    const user = UserSchema1(req.body)
    user.save()
    res.send(req.body)
})

module.exports = router