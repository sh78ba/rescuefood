const mongoose = require("mongoose");

const restaurantDonationSchema = new mongoose.Schema({
  restaurantEmail: {
    type: String,
    required: true,
  },
  restaurantName:{
    type: String,
    required: true,
  },
  assignedVolunteer:{
    type: String,
  },
  status: {
    type: String,
    enum: ["requested", "completed"],
    default: "requested",
  },
  donationList: [
    {
      itemName: {
        type: String,
      },
    },
  ],
  weight: {
    type: Number,
  },
  location:{
    type:[Number],
    required:true
  }

},{timestamps:true});

module.exports = mongoose.model("RestaurantDonation", restaurantDonationSchema);
