const mongoose = require("mongoose");

const restaurantDonationSchema = new mongoose.Schema({
  restaurantEmail: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("RestaurantDonation", restaurantDonationSchema);
