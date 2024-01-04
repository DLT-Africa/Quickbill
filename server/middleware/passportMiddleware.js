const passport = require("passport");

const authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });


const googleAuthCallback = passport.authenticate("google", {
	successRedirect: "https://quickbillpay.onrender.com/auth/google-verify", // Redirect on successful authentication
	failureRedirect: "https://quickbillpay.onrender.com/auth", // Redirect on authentication failure
});

const protectWithGoogleOAuth = (req, res, next) => {
	passport.authenticate("google", { session: false })(req, res, next);
};

module.exports = {authenticateGoogle, googleAuthCallback, protectWithGoogleOAuth };
