const RestaurantDonationModel = require("../models/RestaurantDonation.model");

//donation

const { getIoInstance } = require('./Io.controller');

exports.createRequest = async (req, res) => {
  try {
    const { email, donationList, weight } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Restaurant email is required." });
    }
    if (!Array.isArray(donationList) || donationList.length === 0) {
      return res.status(400).send({ message: "Donation list must be a non-empty array." });
    }
    if (!weight || isNaN(weight)) {
      return res.status(400).send({ message: "Weight must be a valid number." });
    }

    const formattedDonationList = donationList.map((item) => ({ itemName: item }));
    const newRequest = new RestaurantDonationModel({
      restaurantEmail: email,
      donationList: formattedDonationList,
      weight
    });

    await newRequest.save();

    // Fetch all requested donations and emit them via WebSocket
    const allRequestedData = await RestaurantDonationModel.find({ status: "requested" });
    const io = getIoInstance();
    io.emit("requestedData", allRequestedData);

    return res.status(201).send({
      message: "Donation request created successfully.",
      data: newRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};





exports.getDonationHistoryByEmail = async (req, res) => {
  const { email } = req.body; // Get email from request body

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    // Fetch the donations associated with the email
    const donations = await RestaurantDonationModel.find({ restaurantEmail:email }).sort({ date: -1 }); // Sorting by date, latest first

    if (donations.length === 0) {
      return res.status(404).send({ message: "No donation history found for this email." });
    }

    // Return the donations as a response
    res.status(200).send({ donations });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error, please try again later." });
  }
};