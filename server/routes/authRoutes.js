const express = require("express");
const passport = require("passport");
const {
	signUp,
	signIn,
	signOut,
	googleAuthCallback,
	activateAccount,
	fetchUserProfile,
} = require("../controllers/authController");

const router = express.Router();

// Google Signup with optional Google authentication
router.get(
	"/googleauth",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/googleauth/callback", googleAuthCallback);

router.get("/fetch-user-profile", fetchUserProfile);

router.post("/signup", signUp);
router.get("/activate-account/:token", activateAccount);
router.post("/signin", signIn);
router.post("/logout", signOut);

module.exports = router;
