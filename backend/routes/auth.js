
const routerr = require('express').Router()

const passport = require('passport')

routerr.get("/login/success" , (req , res)=>{
    if(req.user){
        res.status(200);json({
            error:false , 
            message:"Log in success",
            user:req.user,
        });
    }else{
        res.status(403);json({
            error:true , 
            message:"Not Authorized",
        });
    }
  
})

routerr.get("/login/failed" , (req , res)=>{
    res.status(401);json({
        error:true , 
        message:"Log in failure",
    });
    
})

routerr.get(
    "/google/callback",
    passport.authenticate("google",{
        successRedirect: process.env.CLIENT_URL,
        failureRedirect:"/login/failed",
        accessType: 'offline',
        prompt: 'consent',
    }),
    
   
)

routerr.get("/logout",(req , res)=>{
    req.logout(),
    res.redirect(process.env.CLIENT_URL)
})


  module.exports = routerr