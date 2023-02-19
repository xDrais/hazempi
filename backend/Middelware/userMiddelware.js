const jwt = require('jsonwebtoken')
const User = require('../Models/user.js')
const bcrypt =require('bcryptjs')
const asynHandler = require('express-async-handler')
const { isValidObjectId } =require("mongoose")


const protectSimpleUser = asynHandler(async (req,res,next)=>{
        let token 
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(" ")[1]
                const decoded = jwt.verify(token,process.env.jwt_Secret)
                req.user = await User.findById(decoded.id).select('-password')
                
                next()
            } catch (error) {
                console.log(error)
                res.status(401)
                throw new Error("Not Authorize")
            }
        }
        if (!token) {
            res.status(401)
            throw new Error("No Token")    
        }

})
module.exports={ protectSimpleUser }
