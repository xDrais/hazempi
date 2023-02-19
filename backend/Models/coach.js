const mongoose = require ('mongoose')

const CoachSchema = new mongoose.Schema({
    user : {type: mongoose.Types.ObjectId,required:true,ref:"User"},
    speciality : {type : String , required : true },
    descriptionCoach : {type : String , required : true }

})
module.exports = mongoose.model('Coach', CoachSchema)