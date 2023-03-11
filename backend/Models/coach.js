const mongoose = require ('mongoose')

const CoachSchema = new mongoose.Schema({
    user : {type: mongoose.Types.ObjectId,required:true,ref:"User"},
    speciality : {type : String , required : true },
    descriptionCoach : {type : String , required : true },
    dateDebutExperience : {type : Date , required : true },
    dateFinExperience : {type : Date , required : true },
    titrePoste : {type : String , required : true},
    certification : { type: String , required : false}






})
module.exports = mongoose.model('Coach', CoachSchema)