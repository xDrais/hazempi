const asynHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const User = require('../Models/user.js')
const Coach = require('../Models/coach.js')
const Sponsor = require('../Models/sponsor.js')
const { generatorOTP ,mailTransport,generateToken } = require('./utils/mail.js')
const verficationToken = require('../Models/token.js')
const { isValidObjectId  } = require("mongoose")
const validator = require("email-validator");




const registerUser = asynHandler( async ( req , res )=> {
    const {  firstName ,
        lastName , 
        email , 
        password , 
        imageUrl , 
        cin  ,
        dateOfBirth , 
        role ,
        phone,
       


    } = req.body
    const { entrepriseName,sector,descriptionSponsor} = req.body
    const { speciality,descriptionCoach,dateDebutExperience ,
        dateFinExperience,
        titrePoste,
        certification} = req.body

    if (!firstName || !lastName ||  !validator.validate(email) ||  !password || !imageUrl ||  !cin  || !dateOfBirth || !phone ){
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
        imageUrl ,
        cin ,
        dateOfBirth ,
        phone,
        role,
        
    })
    //Sponsor Creation

    if (entrepriseName && sector && descriptionSponsor ){
        const sponsor = await Sponsor.create({
            user:user._id,
            entrepriseName:entrepriseName,
            sector:sector,
            descriptionSponsor:descriptionSponsor
        })
            
    }
        //Coach Creation

    if (speciality &&  descriptionCoach && dateDebutExperience &&  dateFinExperience && titrePoste && certification){
        const coach = await Coach.create({
            user:user._id,
            speciality:speciality,
            descriptionCoach:descriptionCoach,
            dateDebutExperience: dateDebutExperience,
            dateFinExperience : dateFinExperience,
            titrePoste: titrePoste,
            certification : certification 
        })
            
    }
    
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


const forgetPass = asynHandler(async (req,res)=>{
    const  { email } = req.body
if (!email){
    res.status(401)
    res.json('Invalid email')
  }
    const user = await User.findOne({ email: email })
    console.log(user)
    if(!user){
        res.status(400)
        throw new Error("Invalid User")
    }
    const otp = generatorOTP()
    console.log(otp)
    await verficationToken.create({
        owner : user._id,
        vtoken: otp
    })
    console.log("mail")
    mailTransport().sendMail({
        from:"devtestmailer101@gmail.com",
        to: user.email,
        subject: "Rest Password Mail",
        html: `<a href="http://localhost:5000/api/user/reset-password?id=${user._id}&token=${otp}"> http://localhost:5000/api/user/reset-password?id=${user._id}&token=${otp}</a>`
    })
   return res.json("done")
})
const reset = asynHandler(async ( req,res)=>{
    const { password } =req.body
    const user = await User.findById(req.user._id)
    if (!user) {
        res.Error(404)
        throw new Error(" User Not Found !!")
    }
    const salt = await bcrypt.genSalt(10)
    const headPassword = await bcrypt.hash(password,salt)

    user.password = headPassword
    await verficationToken.deleteOne({ owner : user._id })
    await user.save()
    mailTransport().sendMail({
        from: 'hazemmega55@gmail.com',
        to: user.email,
        subject: 'password changed',
        html: `<h1>password changed</h1>`
      })
     res.json(" Password Updated ")


})

//admin
const bloque = asynHandler( async(req,res)  =>{
   const  { id } =req.body
   const user = await User.findById(id)
   user.bloque=true
   await user.save()
   res.json("User bloqued")
})
// Give Role admin
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
 //admin get all snponsors
 const test = asynHandler( async(req,res)  =>{
    //const  { id } =req.body
    const user = await Sponsor.find().populate('user')
    return res.json(user)
 })

const updateUser = asynHandler(async(req,res)=>{
    const { email,  firstName , lastName ,phone ,imageUrl,password} = req.body 
    const user = await User.findById( req.params.id  )
    if (password) {
        
        const salt = await bcrypt.genSalt(10)
        const headPassword = await bcrypt.hash(password,salt)
    
        if (user) {
            user.firstName = firstName  || user.firstName
            user.lastName  = lastName || user.lastName
            user.phone = phone || user.phone
            user.imageUrl = imageUrl || user.imageUrl
            user.email = validator(email) || user.email
            user.password = headPassword || user.password
        }
    }
    if (user) {
        user.firstName = firstName  || user.firstName
        user.lastName  = lastName || user.lastName
        user.phone = phone || user.phone
        user.imageUrl = imageUrl || user.imageUrl
        user.email =validator(email) || user.email
    }
    const updateUser = await user.save()
        res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        imageUrl: user.imageUrl,
        email: user.email,
        password: user.password,
    })
        
})
const findUserById = asynHandler(async(req,res)=>{
    const { id } = req.params
    const user = await User.findById( id ).select('-password')
    if (!user) {
        res.Error(404)
        throw new Error(" User Not Found !!")
    }
    res.json(user)

})
module.exports = { 
    registerUser,
    verifyEmail,
    logIn,
    bloque,
    makeAdmin,
    makeSponsor,
    makeCoach,
    reset,
    forgetPass,
    updateUser,
    findUserById
    
 }