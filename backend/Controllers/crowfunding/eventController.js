const asynHandler = require("express-async-handler")
const Event = require('../../Models/event')
const User = require('../../Models/user')

const participate = asynHandler(async(req,res)=>{
    const {eventId , userId} = req.body
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);
    if (event && user){
        if(event.participantsnumber>event.participant.length){
        event.participant.push(user)
        event.save()
        res.json({event}).status(200)
    }
    }else
    res.json({"message":"failed"}).status(400)
  })
const outparticipate = asynHandler(async(req,res)=>{
    const {eventId , userId} = req.body
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);
    if (event && user){
        event.participant.pop(user)
        event.save()
        res.json({event}).status(200)
    }else
    res.json({"message":"failed"}).status(400)
  })
const getparti = asynHandler(async(req,res)=>{
    const ev = await Event.find();
    if (ev ){
       
        res.json({ev}).status(200)
    }else
    res.json({"message":"failed"}).status(400)
  })




  // afficher
      
  const getAllEvents = asynHandler(async(req,res)=>{
    
    const event = await Event.find();
    if (!event) {
        res.Error(404)
        throw new Error(" event Not Found !!")
    }
    res.json(event)
  
  })

  //get by id

  const getEventById = asynHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
  
    if (event) {
      res.json(event)
    } else {
      res.status(404)
      throw new Error('event not found')
    }
  })

//delete

const deleteEvent = asynHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    await event.remove()
    res.json("event removed" )
  } else {
    res.status(404)
    throw new Error('event not found')
  }
})



//update event

const updateEvent = asynHandler(async (req, res) => {
  
  const {
    productName,
    price,
    description,
    category,
    countInStock
  } = req.body
 const  imageProduct =req.file?
 req.file.filename: null;

  const product = await Product.findById(req.params.id)

  if (product) {
    product.productName = productName
    product.price = price
    product.description = description
    product.category = category
    product.countInStock = countInStock
    product.imageProduct = imageProduct

    const updatedProduct = await product.save()
    if (updatedProduct){
      res.status(201).json({
        _id: product.id,
        productName: product.productName,
        user : product.user,
        price: product.price,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
        imageProduct: product.imageProduct
      })
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

  module.exports = { participate,outparticipate,getparti,createEvent,getAllEvents }