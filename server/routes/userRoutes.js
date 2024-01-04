const express = require("express");

const {getProfileByEmail,
	updateUserProfile,
	getUserProfile,
	getAllUsers,
} = require("../controllers/userController.js");
const { protectedRoute } = require("../middleware/protectedRoute");

const router = express.Router();

router.put("/profile",protectedRoute, updateUserProfile);
router.get("/profile",protectedRoute, getUserProfile);
router.get("/google-profile",protectedRoute, getProfileByEmail);
router.get("/users",protectedRoute, getAllUsers);

module.exports = router;
