const path = require("path")
const { v4 : uuid4 } = require('uuid');
const multer = require('multer')
const express = require('express')
const router = express.Router()
const {
  
createProduct
} = require('../Controllers/productController.js')


router.post('/createProduct' ,createProduct)
module.exports = router