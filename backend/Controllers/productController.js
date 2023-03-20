const asynHandler = require("express-async-handler")
const Product = require('../Models/product.js')
const path = require("path");

const createProduct = asynHandler(async (req, res) => {
 
      const {  
        name ,
        price , 
        category , 
        countInStock ,
        description,
        user
      } = req.body

      
     
    const product = await Product.create({
            name ,
            price , 
            user,
            category , 
            countInStock ,
            description
    })

   if(product){
      res.status(201).json({
          _id: product.id,
          name: product.name,
          user : product.user,
          price: product.price,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description
      })
  }
  else{
      res.status(400)
      throw new Error('Invalid user data')
  }

})



const getAllProducts = asynHandler(async(req,res)=>{
    
  const product = await Product.find( {})
  if (!product) {
      res.Error(404)
      throw new Error(" Product Not Found !!")
  }
  res.json(product)

})

const deleteProduct = asynHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const updateProduct = asynHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(201).json({
      _id: product.id,
      name: product.name,
      user : product.user,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      description: product.description
  })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


module.exports = { 
   createProduct,
   getAllProducts,
   deleteProduct,
   updateProduct

}
  