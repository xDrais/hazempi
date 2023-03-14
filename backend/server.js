const express =  require('express')
const env = require('dotenv').config()
const passport = require('passport')
const dotenv = require("dotenv");
const port = process.env.port 
const passportSetUp=require('./passport.js')
const cookieSession = require('cookie-session')
const mongodb = require ('./Config/database.js')
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const authRoute = require('./routes/auth.js')

const CLIENT_ID = '451412350838-khbv8dvibqhhj5n3hekhcidmk4r61a8k.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

 //fb Oauth 
const FacebookStrategy = require('passport-facebook').Strategy;
const app =express()
app.use(
  cookieSession({ name: "session", keys: ["fares"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize())
app.use(passport.session()) 
app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET ,POST ,PUT ,DELETE",
  credentials : true  
}

));
app.use((req, res, next) => {
  console.log(req.user);
  next();
});

    
    
    app.post('/validate-token', (req, res) => {
      const { token } = req.body;
    
      // Check if the token is valid and return a response accordingly
    });



app.use(morgan('dev'))

app.use(express.urlencoded({extended : false}))
app.use('/api/user',require('./routes/userRoute.js'))
app.use('/api/upload', require('./routes/uploadRoute'));
app.use("/auth",authRoute);

// npm run dev
app.listen(port , ()=> console.log(`SERVER CONNECTED ${port}`))