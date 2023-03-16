const asynHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const User = require('../Models/user.js')
const Coach = require('../Models/coach.js')
const Sponsor = require('../Models/sponsor.js')
const { generatorOTP ,mailTransport,generateToken } = require('./utils/mail.js')
const verficationToken = require('../Models/token.js')
const validator = require("email-validator");
const fs = require('fs')
const handlebars = require('handlebars');
const path = require("path");
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
    const { speciality,descriptionCoach,dateDebutExperience ,
      dateFinExperience,
      titrePoste
      
  } = req.body


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
    const test = generatorOTP()

    const [otp, expirationStr] = test.split('|');
    expiration = new Date(expirationStr);


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
        status: entrepriseName  ? 'pendingAsSponsor' : speciality  ? 'pendingAsCoach' : '',
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
    

    console.log(speciality)
    console.log(descriptionCoach)
    console.log(dateDebutExperience)
    console.log(dateFinExperience)
    console.log(titrePoste)
    console.log("============================")

    console.log(entrepriseName)
    console.log(sector)
    console.log(descriptionSponsor)
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
     subject: "One Step To Verify Your Account ",
     html: `
       <html>
         <head>
           <style>
             /* Define your CSS styles here */
             h1 {
               color: #FFFFFF; /* Set header text color to blue */
               text-align: center;
             }
             p {
               color: #444444; /* Set paragraph text color to dark gray */
               font-size: 16px;
               text-align: justify;
             }
             a {
               color: #ffffff; /* Set link text color to white */
               background-color: #AB7F42; /* Set link background color to the desired color */
               padding: 12px 24px;
               display: inline-block;
               text-decoration: none;
               border-radius: 4px;
             }
             a:hover {
               background-color: #007bff; /* Set link background color to darker blue on hover */
             }
           </style>
         </head>
         <body>
           <table width="100%" border="0" cellspacing="0" cellpadding="0">
             <tr>
               <td align="center">
                 <img src="cid:logo" alt="Logo" style="max-width: 200px;">
                 <h1 style="color: #AB7F42; text-align: center;">Account Verified ${user.lastName}  </h1>
                 <h3 style="color: #444444; font-size: 16px; text-align: justify;">Dear ${user.firstName},</p>
                 <p style="color: #444444; font-size: 16px; text-align: justify;">We are pleased to inform you that your account has been successfully verified.</p>
                 <p style="color: #444444; font-size: 16px; text-align: justify;">Please follow the link below to complete the email verification process:</p>
                     <div style="text-align: center;">
                         <a href="${process.env.CLIENT_URL}/verify-email/${user.emailToken}"  style="color: #FFFFFF; background-color: #F8C471; padding: 12px 24px; display: inline-block; text-decoration: none; border-radius: 4px;">Verify your Email</a>
                     </div>
                 <p style="color: #444444; font-size: 16px; text-align: justify;">Thank you for choosing our services.</p>
                 <p style="color: #444444; font-size: 16px; text-align: justify;">Sincerely,</p>
                 <h3 style="color: #444444; font-size: 16px; text-align: justify;">The CARTHAGE CARES Team</p>
               </td>
             </tr>
           </table>
         </body>
       </html>
     `,
     attachments: [{
       filename: 'logo.png',
       path: path.join(__dirname, '../../public/logo.png'),
       cid: 'logo'
     }]
   });
   


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
        if (user && user.status === 'pendingAsSponsor' ||'pendingAsCoach')  {
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


    // const emailToken =req.body.emailToken; 

  const emailToken = req.params.token; 




// if true = email token is undefined 
  // if false = email token is defined
  console.log("emailToken is undefined:", !emailToken);

const user = await User.findOne({ emailToken });
  if (!emailToken.trim()) {
    // email is incorrect
         console.log("Invalid emailToken :", emailToken);
         res.status(400);
         throw new Error("Invalid request");

  } else if (expiration < Date.now()) {
    if (user) {
      user.emailToken= null;
    
      await user.save(); 
    // OTP has expired
        console.log(" the token is expired:", expiration);
      res.status(400);
      throw new Error("Invalid request");

    }
  } else {
    // OTP is valid

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
                user.verify=true;
              
                await user.save(); 
                    mailTransport().sendMail({
                      from: "devtestmailer101@gmail.com",
                      to: user.email,
                      subject: "Account Verified Succeffuly ",
                      html: `
                        <td align="center">
                        
                          <h1 style="color: #AB7F42; text-align: center;"> ${user.lastName} Your Account Is Verified </h1>
                          <h3 style="color: #444444; font-size: 16px; text-align: justify;">Dear ${user.firstName},</p>
                        <p>We are pleased to inform you that your account has been verified. You can now access all the features and services that we offer.</p>
                        <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
                        <p>Best regards,</p>
              
                        <h3 style="color: #444444; font-size: 16px; text-align: justify;">The CARTHAGE CARES Team</p>
                        </td>
                      `
                      
                    });

                 
              
  }
  
}
});
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
            res.status(400).json({message:'Invalid Credentials !'})
            throw new Error('Invalid Credentials !')
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
    if (user.bloque==false){
  
         user.bloque=true
         await user.save()
         res.json("User blocked")
         console.log("user is blocked ")
    }
    else {
     res.Error(404)
     throw new Error(" User already blocked !!")
    }
  })
  
const Unbloque = asynHandler( async(req,res)  =>{
    const  { id } =req.body
    const user = await User.findById(id)
    if (user.bloque==true){
 
         user.bloque=false
         await user.save()
         res.json("User Unbloqued")
         console.log("user is Unblocked ")
    }
    else {
     res.Error(404)
     throw new Error(" User already Unblocked !!")
    }
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

const GetSponsor = asynHandler(  async (req, res) => {
    try {
      const sponsor = await Sponsor.findOne({ user: req.params.userId }).populate('user');
      if (!sponsor) {
        return res.status(404).json({ message: 'Sponsor not found' });
      }
      res.json({ sponsor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

 const GetCoach = asynHandler( async(req,res)  =>{
    try {
        const coach = await Coach.findOne({ user: req.params.userId }).populate('user');
        if (!coach) {
          return res.status(404).json({ message: 'Coach not found' });
        }
        res.json({ coach });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
 })

 const Search = asynHandler( async (req, res) => {
    const key = req.params.key;
    
    const userResults = await User.find({
      $or: [
        { firstName: { $regex:  new RegExp(key, 'i')  } },
        { lastName: { $regex:  new RegExp(key, 'i')  } },
        { email: { $regex:  new RegExp(key, 'i')  } },
        { phone: { $regex:  new RegExp(key, 'i')  } },
      ],
    });
    
    const results = userResults;
    
    res.send(results);
  });
  
const coach = asynHandler(async (req,res)=>{
    const {user,file,speciality,descriptionCoach,dateDebutExperience,dateFinExperience,titrePoste}=req.body
    const{coach}=req.body
    console.log(coach)
    console.log(req.body)
    console.log("===============")
    console.log(file)
    console.log("===============")
    const z =await Coach.create({
      user:user,
      file:file,
      speciality:speciality,
      descriptionCoach:descriptionCoach,
      dateDebutExperience:dateDebutExperience,
      dateFinExperience:dateFinExperience,
      titrePoste:titrePoste
    })
    console.log("===============")
    console.log(z)
    res.status(201).json(z)

  })
  const sponsor = asynHandler(async (req,res)=>{
    const {user,file,entrepriseName,sector,descriptionSponsor}=req.body
    const sponsor = await Sponsor.create({
      user:user,
      file:file,
      entrepriseName:entrepriseName,
      sector:sector,
      descriptionSponsor:descriptionSponsor
    })
    res.status(201).json(sponsor)

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
    ApproveUser,
    GetSponsor,
    GetCoach,
    Unbloque,
    Search,
    coach,
    sponsor
    
 }