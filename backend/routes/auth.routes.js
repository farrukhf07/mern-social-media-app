const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Controller = require('../controller/auth.controller')



// Route1: Create a User using: POST "/api/auth/createuser". Doen't require Auth
router.post(
    '/createuser', 
    [
        body('name','Enter a valid name').isLength({min:3}),
        body('email','Enter a vaild email').isEmail(),
        body('password','Password must be greater than 5 charachters').isLength({min:3})
    ], 
    Controller.createuser
);

// Route2: Autenticate the User using: POST "/api/auth/login". No Login Required
router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be empty').exists()
    ], 
    Controller.loginuser
);

// Route 3: Get user is in user.js

// Route4: For Uploading Images user.js


module.exports = router