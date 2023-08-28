const express = require("express");
const router = express.Router();
const {
  getFoods,
  setFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getFoods).post(protect, setFood);
router.route("/:id").delete(protect, deleteFood).put(protect, updateFood);

module.exports = router;
