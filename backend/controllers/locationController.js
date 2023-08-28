const asyncHandler = require("express-async-handler");

const Location = require("../models/locationModel");
const User = require("../models/userModel");

// Get the locations
// GET /api/events/locations
const getLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find({ user: req.user.id });

  res.status(200).json(locations);
});

// Set the location
// POST /api/events/locations
const setLocation = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const location = await Location.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(location);
});

// Update the location
// PUT /api/events/locations/:id
const updateLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    res.status(400);
    throw new Error("Location not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the location user
  if (location.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedLocation = await Location.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedLocation);
});

// Delete location
// DELETE /api/events/locations/:id
const deleteLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    res.status(400);
    throw new Error("Location not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the location user
  if (location.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await location.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLocations,
  setLocation,
  updateLocation,
  deleteLocation,
};
