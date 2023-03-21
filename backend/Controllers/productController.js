const asynHandler = require("express-async-handler")
const Product = require('../Models/product.js')
const path = require("path");

const createProduct = asynHandler(async (req, res) => {
 
      const {  
        productName ,
        price , 
        category , 
        countInStock ,
        description,
        user
      } = req.body

      
     
    const product = await Product.create({
      productName ,
            price , 
            user,
            category , 
            countInStock ,
            description
    })

   if(product){
      res.status(201).json({
          _id: product.id,
          productName: product.productName,
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
    
  const product = await Product.find( {}).populate('user');
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
    productName,
    price,
    description,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.productName = productName
    product.price = price
    product.description = description
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(201).json({
      _id: product.id,
      productName: product.productName,
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


const SearchProduct = asynHandler( async (req, res) => {
  const key = req.params.key;
  
  const productResults = await Product.find({
    $or: [
      { productName: { $regex:  new RegExp(key, 'i')  } },
      { category: { $regex:  new RegExp(key, 'i')  } },
      { description: { $regex:  new RegExp(key, 'i')  } },
    ],
  });

  const results = productResults;
  
  res.send(results);
});

module.exports = { 
   createProduct,
   getAllProducts,
   deleteProduct,
   updateProduct,
   SearchProduct

}
  