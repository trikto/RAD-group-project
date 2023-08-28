const asyncHandler = require("express-async-handler");

const Event = require("../models/eventModel");
const User = require("../models/userModel");

// Get the events
// GET /api/events
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id });

  res.status(200).json(events);
});

// Set the event
// POST /api/events
const setEvent = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const event = await Event.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(event);
});

// Update the event
// PUT /api/events/:id
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the event user
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEvent);
});

// Delete event
// DELETE /api/events/:id
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error("Event not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the event user
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await event.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getEvents,
  setEvent,
  updateEvent,
  deleteEvent,
};
