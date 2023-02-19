const express = require('express')
const router = express.Router()
const {
    registerUser,
    verifyEmail,
    logIn,
    reset,
    forgetPass,


} = require('../Controllers/userController.js')

const { protectSimpleUser }= require('../Middelware/userMiddelware.js')

router.post('/register',registerUser)
router.post('/verify-email',verifyEmail)
router.post('/login',logIn)
router.post('/forget-password',forgetPass)
router.post('/reset-password/:id/:otp',reset)


//router.get('/test',protectSimpleUser,test)

module.exports = router