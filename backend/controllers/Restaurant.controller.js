const RestaurantDonationModel = require("../models/RestaurantDonation.model");
const RestaurantModel=require("../models/Restaurant.model")
const volunteer_model=require("../models/Volunteer.model")

//donation

const { getIoInstance } = require('./Io.controller');

exports.notifyNearbyVolunteers = async (donation) => {
  try {
    const io = getIoInstance(); // Get the io instance
    if (!io) {
      throw new Error("Socket.io instance is not initialized");
    }

    const { location } = donation; // Restaurant coordinates [lat, lon]

    // Find volunteers within 20km radius
    const nearbyVolunteers = await volunteer_model.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: location
          },
          $maxDistance: 20000 // 20km in meters
        }
      }
    });

    if (nearbyVolunteers.length === 0) {
      console.log("No nearby volunteers found.");
      return;
    }
    

    console.log("Nearby Volunteers:", nearbyVolunteers);

    // Emit event to each nearby volunteer
    nearbyVolunteers.forEach((volunteer) => {
      console.log(`Emitting event to: ${volunteer.email}`);
      io.to(volunteer.email).emit("newDonation", {
        donation
      });
    });

    console.log(io.sockets.adapter.rooms);


  } catch (error) {
    console.error("Error notifying volunteers:", error);
  }
};



exports.createRequest = async (req, res) => {
  try {
    const { email, donationList, weight, location, name } = req.body;

    // Validate required fields
    if (!email) return res.status(400).json({ message: "Restaurant email is required." });
    if (!name) return res.status(400).json({ message: "Restaurant name is required." });
    if (!Array.isArray(donationList) || donationList.length === 0) {
      return res.status(400).json({ message: "Donation list must be a non-empty array." });
    }
    if (!weight || isNaN(weight)) {
      return res.status(400).json({ message: "Weight must be a valid number." });
    }

    // Handle location (allow both [lat, lon] and { coordinates: [lat, lon] })
    let formattedLocation;
    if (Array.isArray(location) && location.length === 2) {
      formattedLocation = location.map(coord => parseFloat(coord));
    } else if (location?.coordinates && Array.isArray(location.coordinates) && location.coordinates.length === 2) {
      formattedLocation = location.coordinates.map(coord => parseFloat(coord));
    } else {
      return res.status(400).json({ message: "Location must be an object with a 'coordinates' array of two numbers." });
    }

    if (formattedLocation.some(isNaN)) {
      return res.status(400).json({ message: "Location coordinates must be valid numbers." });
    }

    // Create new donation request
    const newRequest = new RestaurantDonationModel({
      restaurantEmail: email,
      restaurantName: name,
      donationList: donationList.map(item => ({ itemName: item })),
      weight,
      location: {
        type: "Point",
        coordinates: formattedLocation
      },
      status: "requested",
      assignedVolunteer: ""
    });

    await newRequest.save();

    // Notify nearby volunteers
    await exports.notifyNearbyVolunteers(newRequest);

    // Emit to Socket.IO
    const io = getIoInstance();
    if (io) {
      const requestedDonations = await RestaurantDonationModel.find({ status: "requested" });
      io.emit("requestedDonations", requestedDonations);
      console.log("Emitted all requested donations to volunteers.");
    } else {
      console.error("Socket.io instance is not initialized");
    }

    res.status(200).json({ message: "Donation request saved successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
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


//restaurant profile
exports.getResProfile = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    const getProfile = await RestaurantModel.findOne({ email: email });

    if (!getProfile) {
      return res.status(404).send({ message: "No profile found for this email." });
    }

    const newResponse = {
      _id: getProfile._id,
      name: getProfile.name,
      email: getProfile.email,
      phone: getProfile.phone,
      location: getProfile.location,
      address: getProfile.address
    };

    res.status(200).send(newResponse);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server error, please try again later." });
  }
};


//update otp

exports.saveOTP = async (req, res) => {
  try {
    const { otp, donationId, assignedVolunteer } = req.body;

    if (!otp || !donationId || !assignedVolunteer) {
      return res.status(400).json({ message: "OTP, donationId, and assignedVolunteer are required" });
    }

    const donation = await RestaurantDonationModel.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation request not found" });
    }

    // Update OTP and assignedVolunteer fields
    donation.otp = otp;
    donation.assignedVolunteer = assignedVolunteer;
    donation.status="pending"
    
    await donation.save();

    res.status(200).json({ message: "OTP and Volunteer assigned successfully", donation });
  } catch (error) {
    console.error("Error saving OTP and Volunteer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//verify otp


exports.verifyOtp = async (req, res) => {
  try {
    const { orderId, otp } = req.body;

    // Check if order exists
    const order = await RestaurantDonationModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Check if order is in pending status
    if (order.status !== "pending") {
      return res.status(400).json({ success: false, message: "Order is not in pending state" });
    }

    // Validate OTP
    if (order.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Update order status to delivered
    order.status = "completed";
    order.updatedAt = new Date();
    await order.save();

    return res.status(200).json({ success: true, message: "OTP verified, order marked as delivered" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


