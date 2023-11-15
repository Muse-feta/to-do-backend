const express = require('express');
const {register, login, getUser, checkUser, getUserById} = require('../controller/userController');
const auth = require('../middleware/authMiddleWare');

const router = express.Router()

router.post("/register", register);

router.post('/login', login);

router.get('/getUser',auth, getUser)

router.get('/checkUser', auth, checkUser)

module.exports = router