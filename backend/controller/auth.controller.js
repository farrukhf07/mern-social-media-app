const {validationResult} = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'jwtsecret$$'

// create New User
exports.createuser = async (req, res)=>{
    // if there are errors return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        // check weather email exist already
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry user already exist"});
        }
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        
        res.status(201).json({success:true, authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

// Login User
exports.loginuser = async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please login with correct Email"});
        }
        if(password != user.password){
            return res.status(400).json({error:"Please login with correct credentials"});
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
