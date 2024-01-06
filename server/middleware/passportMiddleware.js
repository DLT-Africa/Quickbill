const passport = require("passport");

const authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });


const googleAuthCallback = passport.authenticate("google", {
	failureRedirect: "https://quickbillpay.onrender.com/auth", // Redirect on authentication failure
});


module.exports = {authenticateGoogle, googleAuthCallback };
