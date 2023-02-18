const express = require('express')
const router = express.Router()

const {
    registerUser,
    verifyEmail
} = require('../Controllers/userController.js')


router.post('/register',registerUser)
router.post('/verify-email',verifyEmail)

module.exports = router