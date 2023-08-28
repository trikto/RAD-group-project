const express = require("express");
const router = express.Router();
const {
  getLocations,
  setLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getLocations).post(protect, setLocation);
router
  .route("/:id")
  .delete(protect, deleteLocation)
  .put(protect, updateLocation);

module.exports = router;
