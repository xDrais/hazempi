const express = require('express')
const router = express.Router()
const {
    registerUser,
    verifyEmail,
    logIn
} = require('../Controllers/userController.js')

const { protectSimpleUser }= require('../Middelware/userMiddelware.js')

router.post('/register',registerUser)
router.post('/verify-email',verifyEmail)
router.post('/login',logIn)

module.exports = router