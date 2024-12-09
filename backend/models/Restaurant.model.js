const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location:{
    type:String,
  },
  address:{
    type:String,
  },
  proofid:{
    type:String,
  },
  password:{
    type:String,
    required:true
  }

});

module.exports=mongoose.model("Restaurant",restaurantSchema)
