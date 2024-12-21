const RestaurantDonationModel = require("../models/RestaurantDonation.model");

//donation

exports.createRequest = async (req, res) => {
    try { 

      const { email, donationList, weight } = req.body;
  
      // Validate required fields
      if (!email) {
        return res.status(400).json({ message: 'Restaurant email is required.' });
      }
  
      // Create a new donation request
      const newRequest = new RestaurantDonationModel({
        restaurantEmail:email,
        donationList,
        weight,
      });
  
      // Save the donation request to the database
      await newRequest.save();
  
      // Respond with the created request
      res.status(201).json({
        message: 'Donation request created successfully.',
        data: newRequest,
      });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the donation request.', error: error.message });
    }
  };
  