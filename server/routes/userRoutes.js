const express = require("express");

const {getProfileByEmail,
	updateUserProfile,
	getUserProfile,
	getAllUsers,
} = require("../controllers/userController.js");
const { protectedRoute } = require("../middleware/protectedRoute");
const { protectWithGoogleOAuth } = require("../middleware/passportMiddleware.js");

const router = express.Router();

router.get("/google-profile",  getProfileByEmail);
router.put("/profile",protectedRoute, updateUserProfile);
router.get("/profile",protectedRoute, getUserProfile);
router.get("/users",protectedRoute, getAllUsers);

module.exports = router;
