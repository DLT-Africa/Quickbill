const express = require("express");

const {
	updateUserProfile,
	getUserProfile,
	getAllUsers,
} = require("../controllers/userController.js");
const { protectedRoute } = require("../middleware/protectedRoute");

const router = express.Router();

router.put("/profile",protectedRoute, updateUserProfile);
router.get("/profile",protectedRoute, getUserProfile);
router.get("/users",protectedRoute, getAllUsers);

module.exports = router;
