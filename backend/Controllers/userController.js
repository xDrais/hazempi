const asynHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const User = require('../Models/user.js')
const { generatorOTP ,mailTransport,generateToken } = require('./utils/mail.js')
const verficationToken = require('../Models/token.js')
const { isValidObjectId  } = require("mongoose")
const validator = require("email-validator");




const registerUser = asynHandler( async ( req , res )=> {
    const {  firstName ,lastName , email , password , imageUser , cin  ,dateOfBirth , role ,phone} = req.body
    if (!firstName || !lastName ||  !validator.validate(email) ||  !password || !imageUser ||  !cin  || !dateOfBirth || !phone ){
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
        throw new Error(" User Already Verified !!")
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

const logIn = asynHandler( async (req,res)=>{
        const  { email , password } = req.body
        
        const user = await User.findOne({ email: email })

        if (user &&(await bcrypt.compare(password,user.password) ) ) {
            res.json({
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                imageUrl: user.imageUrl,
                phone: user.phone,
                cin: user.cin,
                role : user.role, 
                verify : user.verify, 
                bloque : user.bloque, 
                dateOfBirth : user.dateOfBirth, 
                token: generateToken(user._id)
            })
            
        }else{
            res.status(400)
            throw new Error("Invalid Credentials")
        }
})

const bloque = asynHandler( async(req,res)  =>{
   const  { id } =req.body
   const user = await User.findById(id)
   user.bloque=true
   await user.save()
   res.json("User bloqued")
})
// Give Role
const makeAdmin = asynHandler( async(req,res)  =>{
    const  { id } =req.body
    const user = await User.findById(id)
    user.role.name="adminRole"
    await user.save()
    res.json("make it admin , Done !!")
 })
 const makeSponsor = asynHandler( async(req,res)  =>{
    const  { id } =req.body
    const user = await User.findById(id)
    user.role.name="sponsorRole"
    await user.save()
    res.json("make it sponsor , Done !!")
 })
 const makeCoach = asynHandler( async(req,res)  =>{
    const  { id } =req.body
    const user = await User.findById(id)
    user.role.name="coachRole"
    await user.save()
    res.json("make it coach , Done !!")
 })
 // Give Role Done
 
module.exports = { 
    registerUser,
    verifyEmail,
    logIn,
    bloque,
    makeAdmin,
    makeSponsor,
    makeCoach,
 }