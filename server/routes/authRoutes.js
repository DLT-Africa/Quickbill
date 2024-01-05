const express = require("express");
const passport = require("passport");
const {
	signUp,
	signIn,
	signOut,
  successRedirect,

	activateAccount,
	fetchUserEmail,
} = require("../controllers/authController");
const { googleAuthCallback, authenticateGoogle } = require("../middleware/passportMiddleware");

const router = express.Router();

// Google Signup with optional Google authentication
router.get(
	"/googleauth",
	authenticateGoogle
);

router.get("/googleauth/callback", successRedirect);
// router.get("/fetch-user-profile", fetchUserEmail);
router.post("/signup", signUp);
router.get("/activate-account/:token", activateAccount);
router.post("/signin", signIn);
router.post("/logout", signOut);

module.exports = router;
