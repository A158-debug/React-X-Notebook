const express = require('express')
const { body, validationResult } = require('express-validator');
const UserSchema1 = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'wantToBuyLamborghini$16';

//ROUTE: 1 create a user using POSt "/api/auth/createuser"
router.get('/createuser', [ //add validation
   
    body('name', 'Enter a valid username').isLength({ min: 5 }),         // username validation
    body('email', 'Enter a valid email').isEmail(),                      //  email validation
    body('password', 'Enter a valid password').isLength({ min: 5 }),     // password must be at least 5 chars long
],  async (req, res) => {

  //if there is error send the bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //check whether the email of user already exist or not
        let user = await UserSchema1.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"sorry user of this email is already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);

        //create  a new user
        user = await UserSchema1.create({
            name : req.body.name,
            password:secPass,
            email  : req.body.email,
        }); 
        const data = {
            user: {
              id: user.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
      
      
          res.json(user)
          res.json({ authtoken }) 

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

//========== ROUTE : 2 Authentication a user using post "/api/auth/login"

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Pssword cannot be blank').exist(),  
], async (req, res)=>{
      let success = false
      //if there is error send the bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await UserSchema1.findOne({email});
        if(!user) {
            return res.status(400).json({error:"Please try to log in with correct creditials"});

        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare) {
            success = false
            return res.status(400).json({success,error:"Please try to log in with correct creditials"});

        }
        const data = {
            user: {
              id: user.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({ success, authtoken })
          
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");     
    }
});

//========== ROUTE : 3 Authentication a user using post "/api/auth/getuser"

router.post('/getuser',fetchuser,async (req,res)=>{

    try {
        let userId = req.user.id;
        const user = await UserSchema1.findById(userId).select("-password")
        res.send(user)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
        
    }
});

module.exports = router