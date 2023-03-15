const express =  require('express')
const env = require('dotenv').config()
const port = process.env.port 
const mongodb = require ('./Config/database.js')
const morgan = require('morgan')
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport')
const passportSetUp=require('./passport.js')
const authRoute = require('./routes/auth.js')
//connect database
mongodb() 

const app =express()
app.use(express.json())
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

app.use(morgan('dev'))

app.use(express.urlencoded({extended : false}))
app.use('/api/user',require('./routes/userRoute.js'))
app.use('/api/upload', require('./routes/uploadRoute'));
app.use("/auth",authRoute);
// npm run dev
app.listen(port , ()=> console.log(`SERVER CONNECTED ${port}`))