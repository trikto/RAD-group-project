const asyncHandler = require("express-async-handler");

const Sound = require("../models/soundModel");
const User = require("../models/userModel");

// Get the sounds
// GET /api/events/sounds
const getSounds = asyncHandler(async (req, res) => {
  const sounds = await Sound.find({ user: req.user.id });

  res.status(200).json(sounds);
});

// Set the sound
// POST /api/events/sounds
const setSound = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const sound = await Sound.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(sound);
});

// Update the sound
// PUT /api/events/sounds/:id
const updateSound = asyncHandler(async (req, res) => {
  const sound = await Sound.findById(req.params.id);

  if (!sound) {
    res.status(400);
    throw new Error("Sound not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the sound user
  if (sound.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedSound = await Sound.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedSound);
});

// Delete sound
// DELETE /api/events/sounds/:id
const deleteSound = asyncHandler(async (req, res) => {
  const sound = await Sound.findById(req.params.id);

  if (!sound) {
    res.status(400);
    throw new Error("Sound not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the sound user
  if (sound.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await sound.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getSounds,
  setSound,
  updateSound,
  deleteSound,
};
