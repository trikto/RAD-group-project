const asyncHandler = require("express-async-handler");

const Food = require("../models/foodModel");
const User = require("../models/userModel");

// Get the foods
// GET /api/events/foods
const getFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find({ user: req.user.id });

  res.status(200).json(foods);
});

// Set the food
// POST /api/events/foods
const setFood = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const food = await Food.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(food);
});

// Update the food
// PUT /api/events/foods/:id
const updateFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    res.status(400);
    throw new Error("Food not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the food user
  if (food.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedFood);
});

// Delete food
// DELETE /api/events/foods/:id
const deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    res.status(400);
    throw new Error("Food not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the food user
  if (food.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await food.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getFoods,
  setFood,
  updateFood,
  deleteFood,
};
