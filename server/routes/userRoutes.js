const express = require("express");

const {
	deleteUser,
	updateUserProfile,
	getUserProfile,
	getAllUsers,
} = require("../controllers/userController.js");
const { protectedRoute } = require("../middleware/protectedRoute");

const router = express.Router();

// router.delete("/:id", deleteUser);
router.put("/profile",protectedRoute, updateUserProfile);
router.get("/profile",protectedRoute, getUserProfile);
router.get("/users",protectedRoute, getAllUsers);

module.exports = router;
