const asyncHandler = require("express-async-handler");

const Decoration = require("../models/decorationModel");
const User = require("../models/userModel");

// Get the decorations
// GET /api/events/decorations
const getDecorations = asyncHandler(async (req, res) => {
  const decorations = await Decoration.find({ user: req.user.id });

  res.status(200).json(decorations);
});

// Set the decoration
// POST /api/events/decorations
const setDecoration = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const decoration = await Decoration.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(decoration);
});

// Update the decoration
// PUT /api/events/decorations/:id
const updateDecoration = asyncHandler(async (req, res) => {
  const decoration = await Decoration.findById(req.params.id);

  if (!decoration) {
    res.status(400);
    throw new Error("Decoration not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the decoration user
  if (decoration.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedDecoration = await Decoration.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedDecoration);
});

// Delete decoration
// DELETE /api/events/decorations/:id
const deleteDecoration = asyncHandler(async (req, res) => {
  const decoration = await Decoration.findById(req.params.id);

  if (!decoration) {
    res.status(400);
    throw new Error("Decoration not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the decoration user
  if (decoration.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await decoration.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getDecorations,
  setDecoration,
  updateDecoration,
  deleteDecoration,
};
