const express = require('express');
const { register, login } = require('../controllers/authController')
const router = express.Router()

router.post('/register', register)
    .post('/login', login)

module.exports = router