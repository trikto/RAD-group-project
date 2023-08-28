const express = require("express");
const router = express.Router();
const {
  getInvites,
  setInvite,
  updateInvite,
  deleteInvite,
} = require("../controllers/inviteController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getInvites).post(protect, setInvite);
router.route("/:id").delete(protect, deleteInvite).put(protect, updateInvite);

module.exports = router;
