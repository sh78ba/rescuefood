const mongoose=require("mongoose")

const volunteerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model('Volunteer',volunteerSchema)
