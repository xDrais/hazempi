const path = require("path")
const { v4 : uuid4 } = require('uuid');
const multer = require('multer')
const express = require('express')
const router = express.Router()
const {
    registerUser,
    verifyEmail,
    logIn,
    reset,
    forgetPass,
    updateUser,
    findUserById,
    getAllUser,
    ApproveUser,
    GetCoach,
    GetSponsor,
    bloque,
    Unbloque

} = require('../Controllers/userController.js')

const { protectSimpleUser,validator,isAdmin }= require('../Middelware/userMiddelware.js')



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../../frontend/public/images')); // use absolute path for uploaded files
  },
    filename: function(req, file, cb) {
      cb(null, uuid4()+ '-' + Date.now() + path.extname(file.originalname)); // specify the file name
    }
  });
  
  const fileFilter = (req,file,cb) =>{
    const allowedFileTypes = ['image/jpeg' , 'image/jpg' , 'image/png'];
    if(allowedFileTypes.includes(file.mimetype))
    {
        cb(null,true);
    } else {
        cb(null, false);
    }
  }
  // Create a new Multer upload instance
  let upload = multer({ storage, fileFilter});

router.post('/register',upload.single('imageUrl') ,registerUser)
router.post('/register',registerUser)
//router.put('/verify-email',verifyEmail)
router.put('/block',bloque)
router.put('/unblock',Unbloque)
router.put('/verify-email/:token',verifyEmail)
router.post('/login',logIn)
router.post('/forget-password',forgetPass)
router.post('/reset-password',validator,reset)
router.put('/updateUser/:id',protectSimpleUser,updateUser)
router.get('/getuser/:id',protectSimpleUser,findUserById)
router.get('/getalluser',getAllUser)
router.get('/coach/:userId',GetCoach)
router.get('/sponsor/:userId',GetSponsor)
router.put('/approve/:id',ApproveUser)


//router.get('/test',protectSimpleUser,test)

module.exports = router