const express =  require('express')
const env = require('dotenv').config()
const port = process.env.port 
const mongodb = require ('./Config/database.js')
const morgan = require('morgan')

//connect database
mongodb() 

const app =express()
app.use(express.json())

app.use(morgan('dev'))

app.use(express.urlencoded({extended : false}))
app.use('/api/user',require('./routes/userRoute.js'))

// npm run dev
app.listen(port , ()=> console.log(`SERVER CONNECTED ${port}`))