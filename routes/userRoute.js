const express = require('express');
const router = express.Router();


// usercontroller
const { register, login } = require('../controller/userController');


router.post('/register',register)
router.get('/login',login)


module.exports= router;