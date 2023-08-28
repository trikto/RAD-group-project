const asyncHandler = require("express-async-handler");

const Invite = require("../models/inviteModel");
const User = require("../models/userModel");

// Get the invites
// GET /api/events/invites
const getInvites = asyncHandler(async (req, res) => {
  const invites = await Invite.find({ user: req.user.id });

  res.status(200).json(invites);
});

// Set the invite
// POST /api/events/invites
const setInvite = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const invite = await Invite.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(invite);
});

// Update the invite
// PUT /api/events/invites/:id
const updateInvite = asyncHandler(async (req, res) => {
  const invite = await Invite.findById(req.params.id);

  if (!invite) {
    res.status(400);
    throw new Error("Invite not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the invite user
  if (invite.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedInvite = await Invite.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedInvite);
});

// Delete invite
// DELETE /api/events/invites/:id
const deleteInvite = asyncHandler(async (req, res) => {
  const invite = await Invite.findById(req.params.id);

  if (!invite) {
    res.status(400);
    throw new Error("Invite not found");
  }

  // Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Verify whether the logged in user matches the invite user
  if (invite.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await invite.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getInvites,
  setInvite,
  updateInvite,
  deleteInvite,
};
