const express = require("express");

const {
	// deleteUser,
	updateUserProfile,
	getUserProfile,
	getAllUsers,
} = require("../controllers/userController.js");
// const {sendMail} = require("../controllers/mailController.js");
const { protectedRoute } = require("../middleware/protectedRoute");

const router = express.Router();

// router.delete("/:id", deleteUser);
router.put("/profile",protectedRoute, updateUserProfile);
router.get("/profile",protectedRoute, getUserProfile);
router.get("/users",protectedRoute, getAllUsers);
// router.post("/sendmail",protectedRoute, sendMail);

module.exports = router;
