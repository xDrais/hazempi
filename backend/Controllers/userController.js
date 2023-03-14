const asynHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const User = require('../Models/user.js')
const Coach = require('../Models/coach.js')
const Sponsor = require('../Models/sponsor.js')
const { generatorOTP ,mailTransport,generateToken } = require('./utils/mail.js')
const verficationToken = require('../Models/token.js')
const { isValidObjectId  } = require("mongoose")
const validator = require("email-validator");
const crypto= require("crypto");
const jwt = require("jsonwebtoken");
const {storage } = require ('../routes/userRoute')
const fs = require('fs')
const handlebars = require('handlebars');

const registerUser = asynHandler( async ( req , res )=> {
    const {  firstName ,
        lastName , 
        email , 
        password , 
        cin  ,
        dateOfBirth , 
        role ,
        phone, 
    } = req.body
    const  imageUrl =req.file.filename 

    const { entrepriseName,sector,descriptionSponsor,file} = req.body
   
    

    if (!firstName || !lastName  ){
            res.json({"message":"Please add  all fields"}).status(400)
            throw new Error('Please add  all fields')
    }
    //verifier user exits by email
    const userExists  =  await User.findOne({email})
    if(userExists){
        res.status(401).send({ message: 'User with this E-mail adress already exists' });
        throw new Error('User with this E-mail adress already exists')
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
        role: {name: "userRole"},
                emailToken: otp

        
    })
    //Sponsor Creation
    console.log(file)
    const fil=file
    if (entrepriseName && sector && descriptionSponsor ){
        const sponsor = await Sponsor.create({
            user:user._id,
            entrepriseName:entrepriseName,
            sector:sector,
            descriptionSponsor:descriptionSponsor,
            file:fil
           
        })
            
    }
    
    const { speciality,descriptionCoach,dateDebutExperience ,
        dateFinExperience,
        titrePoste
        
    } = req.body
        //Coach Creation
    if (speciality  ){
        const coach = await Coach.create({
            user:user._id,
            speciality:speciality,
            descriptionCoach:descriptionCoach,
            dateDebutExperience: dateDebutExperience,
            dateFinExperience : dateFinExperience,
            titrePoste: titrePoste,
            file:fil
        })           
    }

    //const token = createToken(user._id);

    
    
    mailTransport().sendMail({
      from:"devtestmailer101@gmail.com",
      to: user.email,
      subject: "Account Verified ",
      html: `<h1>Account Verified  ${user.lastName} ,
      <a href = '${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}'> Verify your Email
      </h1>` ,
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
            verfication : user.emailToken       
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})

const ApproveUser = asynHandler( async (req, res) => {
    const id = req.params.id;
      const role = req.body.role;
      try {
        const user = await User.findById(id);
        if (user && user.status === 'pending') {
          user.role.name = role;
          user.status = 'approved';
          await user.save();
          res.send(`User ${user.firstName} approved and set to role ${role}`);
        } else {
          res.status(404).send('User not found or already approved/rejected');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
      });

const  verifyEmail = asynHandler( async (req,res) => {
    const emailToken =req.body.emailToken; 

    console.log("req.params.emailToken:", req.params.emailToken);
 // const emailToken = req.params.token; 

  console.log("emailToken is undefined:", !emailToken);

  if (!emailToken || !emailToken.trim()) {
    console.log("Invalid emailToken:", emailToken);
    res.status(400);
    throw new Error("Invalid request");
  }

  const user = await User.findOne({ emailToken });
  if (!user) {
    res.status(404);
    throw new Error("User Not Found!!");
  }

  if (user.verify) {
    res.status(400); 
    throw new Error("User Already Verified!!");
  }

  if (!emailToken) {
      res.status(404)
      throw  new Error(" Invalid Token !! ")
  }
  if (user) {
  user.emailToken= null;
  user.updateOne({ verified: true })

  await user.save(); 
  res.status(200).json({
    _id: user._id,
    email: user.email,
    verify: user?.verify,
  });

  mailTransport().sendMail({
      from:"devtestmailer101@gmail.com",
      to: user.email,
      subject: "Account Verified ",
      html: `<h1>Account Verified</h1>`
  })
  res.json("Your Email is Verified ")
  }

  
  res.redirect(`${process.env.CLIENT_URL}/login`);
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
if (!email ){
    res.status(404).json({"message":'Invalid email'})
  }
    const user = await User.findOne({ email: email })
    console.log(user)
    if(!user){
        res.status(404).json({"message":"Invalid User"})
    }
    const otp = generatorOTP()
    console.log(otp)
    await verficationToken.create({
        owner : user._id,
        vtoken: otp
    })
    console.log("mail")
    fs.readFile('backend\\utils\\content.html', {encoding: 'utf-8'}, function (err, html) {
        if (err) {
          console.log(err);
        } else {
            var template = handlebars.compile(html);
            var replacements = {
                name: user.lastName+" "+user.firstName,
                action_url: `http://localhost:3000/reset-password?id=${user._id}&token=${otp}`,
            };
            var htmlToSend = template(replacements);
    mailTransport().sendMail({
        from:"devtestmailer101@gmail.com",
        to: user.email,
        subject: "Rest Password Mail",
        html: htmlToSend
    })}})
   return res.json("done")
})
const reset = asynHandler(async ( req,res)=>{
    const { password } =req.body
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(404).json({"message":"User Not Found !!"})
        throw new Error(" User Not Found !!")
    }
    const salt = await bcrypt.genSalt(10)
    const headPassword = await bcrypt.hash(password,salt)

    user.password = headPassword
    await verficationToken.deleteOne({ owner : user._id })
    await user.save()
    fs.readFile('backend\\utils\\index.html', {encoding: 'utf-8'}, function (err, html) {
        if (err) {
          console.log(err);
        } else {
            var template = handlebars.compile(html);
            var replacements = {
                action_url: `http://localhost:3000/login`,
            };
            var htmlToSend = template(replacements);
    mailTransport().sendMail({
        from: 'hazemmega55@gmail.com',
        to: user.email,
        subject: 'password changed',
        html: htmlToSend
      })}})
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

const getAllUser = asynHandler(async(req,res)=>{
    
    const user = await User.find( {}).select('-password')
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
    findUserById,
    getAllUser,
    ApproveUser
    
 }