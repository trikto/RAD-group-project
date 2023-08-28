const express = require("express");
const router = express.Router();
const {
  getSounds,
  setSound,
  updateSound,
  deleteSound,
} = require("../controllers/soundController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getSounds).post(protect, setSound);
router.route("/:id").delete(protect, deleteSound).put(protect, updateSound);

module.exports = router;
