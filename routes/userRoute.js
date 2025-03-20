const express = require('express');
const router = express.Router();
//authintication middleware require
const authMiddleware = require('../middleware/authMiddleware')


// usercontroller
const { register, login,checkUser } = require('../controller/userController');


router.post('/register',register)
router.get('/login',login)
router.get('/check', authMiddleware,checkUser)


module.exports= router;