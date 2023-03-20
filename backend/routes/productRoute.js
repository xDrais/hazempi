const path = require("path")
const { v4 : uuid4 } = require('uuid');
const multer = require('multer')
const express = require('express');
const { createProduct, getAllProducts, deleteProduct, updateProduct } = require("../Controllers/productController");
const router = express.Router()

router.post('/createProduct' ,createProduct),
router.get('/getAll' ,getAllProducts),
router.delete('/delete/:id' ,deleteProduct),
router.put('/updateProduct/:id' ,updateProduct),


module.exports = router