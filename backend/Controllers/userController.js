const asynHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const User = require('../Models/user.js')
const { generatorOTP ,mailTransport } = require('./utils/mail.js')
const verficationToken = require('../Models/token.js')
const { isValidObjectId  } = require("mongoose")


const registerUser = asynHandler( async ( req , res )=> {
    const {  firstName ,lastName , email , password , imageUser , cin  ,dateOfBirth , role ,phone} = req.body
    if (!firstName || !lastName ||  !email ||  !password || !imageUser ||  !cin  || !dateOfBirth || !phone ){
            res.status(400)
            throw new Error('Please add  all fields')
    }

    //verifier user exits by email
    const userExists  =  await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    
    //bcryptjs password cryptage
    const salt = await bcrypt.genSalt(10)
    const headPassword = await bcrypt.hash(password,salt)

    const otp = generatorOTP()

    //create user

    const user = await User.create({
        firstName ,
        lastName ,
        email , 
        password: headPassword  , 
        imageUser ,
        cin ,
        dateOfBirth ,
        phone,
        role,
    })

    const verfication = await verficationToken.create({
        owner : user._id,
        vtoken: otp
    })
    mailTransport().sendMail({
        from:"devtestmailer101@gmail.com",
        to: user.email,
        subject: "Verfication Mail",
        html: `<h1>${otp}</h1>`
    })


    if(user){
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            imageUrl: user.imageUrl,
            cin: user.cin,
            dateOfBirth: user.dateOfBirth,
            role : user.role,           
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})
const  verifyEmail = asynHandler( async (req,res) => {
   const { id , otp } = req.body
    if ( !id || !otp.trim()){
        res.status(400)
        throw new Error ("Invalid reequest")
    }
    if (!isValidObjectId(id)) {

        res.status(404)
        throw new Error (" Invalid User ")
    }
    const user = await User.findById(id)
    if (!user) {
        res.Error(404)
        throw new Error(" User Not Found !!")
    }
    if (user.verify) {
        res.status(404)
        throw new Error(" User Already Verified !! ")
    }
    const token = await verficationToken.findOne({owner: user._id})

    if (!token) {
        res.status(404)
        throw  new Error(" Invalid Token !! ")
    }
    const isMatch = await bcrypt.compareSync(otp,token.vtoken)
    if (!isMatch) {
        res.status(404)
        throw  new Error(" Invalid Token !! ") 
    }
    user.verify = true;
    await verficationToken.findByIdAndDelete(token._id)
    await user.save()
    mailTransport().sendMail({
        from:"devtestmailer101@gmail.com",
        to: user.email,
        subject: "Account Verified ",
        html: `<h1>Account Verified</h1>`
    })
    res.json("Your Email is Verified ")

})

module.exports = { registerUser, verifyEmail }