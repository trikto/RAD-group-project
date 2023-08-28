const express = require("express");
const router = express.Router();
const {
  getDecorations,
  setDecoration,
  updateDecoration,
  deleteDecoration,
} = require("../controllers/decorationController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getDecorations).post(protect, setDecoration);
router
  .route("/:id")
  .delete(protect, deleteDecoration)
  .put(protect, updateDecoration);

module.exports = router;
