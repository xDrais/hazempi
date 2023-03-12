const mongoose = require ('mongoose')

const RoleSchema = new mongoose.Schema({

    name : {type : String ,required : true , default : "userRole"}
})

const UserSchema = new mongoose.Schema({
    email : {type : String , required: true , unique: true},
    lastName: {type: String, required: true},
    firstName: {type:String, required:true},
    cin: {type:Number, required:true },
    password: {type:String, required:true},
    phone: {type:String, required:true}, 
    dateOfBirth: {type:Date, required:true},
    imageUrl: {type:String},
    createdAt: {type:Date, required:true, default: Date.now},
    bloque: {type:Boolean, required:true, default: false},
    verify: {type:Boolean, required:true, default: false},
    emailToken:{ type: String},
    role :RoleSchema,
<<<<<<< Updated upstream

=======
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      }
>>>>>>> Stashed changes
    
    


})
module.exports = mongoose.model('User', UserSchema)