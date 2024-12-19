const volunteer_model = require("../models/Volunteer.model");

exports.volunteerLocationUpdate = async (req, res) => {
  const { email, coordinates } = req.body; 
  try {
   
    const getUser = await volunteer_model.findOne({ email: email });

    
    if (!getUser) {
      return res.status(404).send({ message: "User not found" });
    }

    
    let parsedCoordinates;
    try {
      parsedCoordinates = Array.isArray(coordinates) ? coordinates : JSON.parse(coordinates);
    } catch (err) {
      return res.status(400).send({ message: "Invalid coordinates format" });
    }

    if (
      !Array.isArray(parsedCoordinates) ||
      parsedCoordinates.length !== 2 ||
      !parsedCoordinates.every((coord) => typeof coord === 'number')
    ) {
      return res.status(400).send({ message: "Invalid coordinates format" });
    }

    // Update the location of the volunteer
    const result = await volunteer_model.findOneAndUpdate(
      { email: email },
      { $set: { "location.coordinates": parsedCoordinates } },
      { new: true }
    );

    // Send success response
    res.status(200).send({ message: "Location updated successfully" });
  } catch (err) {
    console.log("Error in location update", err);
    res.status(500).send({ message: "Error in updating location" });
  }
};