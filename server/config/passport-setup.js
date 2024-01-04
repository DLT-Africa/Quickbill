const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const initializePassport = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://quickbillpay.onrender.com/auth/googleauth/callback', // Adjust accordingly
  },
  (accessToken, refreshToken, profile, done) => {
    // Google authentication callback
    const user = {
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
    };
    return done(null, user);
  }));

  // Serialize and deserialize user (optional)
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = initializePassport;