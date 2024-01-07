const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateCookieToken } = require("../utils/generateToken");
const UnconfirmedUser = require("../models/unconfirmedUserModel");
const crypto = require("crypto");
const { sendConfirmationMail } = require("../utils/sendMail");
const passport = require("passport");

// Google authentication callback

const successRedirect = async (req, res) => {
	try {
		//   // Assuming the user is available in req.user after successful authentication
		const googleProfile = req.user;

		// Fetch user profile from MongoDB based on the email
		const user = await User.findOne({ email: googleProfile.email });

		if (!user) {
			// Handle the case where the user is not found in the database
			return res
				.status(404)
				.json({ message: "User not found in the database" });
		}

		//   Perform any additional actions with the user profile
		//   ...

		const token = generateCookieToken({
			email: user.email,
			id: user._id,
		});

		// Creates Secure Cookie with token token
		res.cookie("jwt", token, {
			domain: "onrender.com",
			// path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 1 * 60 * 60 * 1000, //1hr
		});
		//   Redirect or send a response as needed
		//   res.redirect(`https://quickbillpay.onrender.com/auth/google-verify?email=${encodeURIComponent(user.email)}`);
		// req.session.user = req.user;
		res.redirect(`https://quickbillpay.onrender.com/auth/google-verify`);
	} catch (error) {
		// Handle errors
		console.error("Error fetching user profile:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const signUp = async (req, res) => {
	try {
		// Extracting email, password, and name from the request body
		const { email, password, name } = req.body;

		// Checking if the user already exists
		const existingUser = await User.findOne({ email }).select("-password");
		if (existingUser)
			return res.status(400).json({ error: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);

		// Creating a new Unconfirmed user using the provided email, hashed password, and name
		const token = crypto.randomBytes(32).toString("hex");
		// const tokenExpiryDate = new Date() + 10 * 60 * 1000; // 10 mins from now

		const newUnconfirmedUser = await UnconfirmedUser.create({
			email,
			password: hashedPassword,
			name,
			token,
			// tokenExpiryDate,
		});

		sendConfirmationMail(newUnconfirmedUser, res);
	} catch (error) {
		// Handling any errors that occur during the process
		console.log(error);
		res.status(500).json({ error: "Something went wrong" });
	}
};

const activateAccount = async (req, res) => {
	try {
		const token = req.params.token;
		console.log(token);

		const unconfirmedUser = await UnconfirmedUser.findOne({ token });
		console.log(unconfirmedUser);

		if (!unconfirmedUser) {
			return res
				.status(400)
				.json({ error: "Invalid activation link or activation link expired" });
		} else {
			const confirmedUser = await User.create({
				email: unconfirmedUser.email,
				password: unconfirmedUser.password,
				name: unconfirmedUser.name,
			});

			await UnconfirmedUser.findByIdAndDelete(unconfirmedUser._id);
			console.log(confirmedUser);

			return res
				.status(200)
				.json({ message: "Account activated successfully", confirmedUser });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const signIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Checking if the user exists in the database
		const existingUser = await User.findOne({ email });

		if (!existingUser)
			return res.status(404).json({ error: "User doesn't exist" });

		if (!existingUser.password) {
			return res.status(404).json({
				error: "This user was registered using google Authentication",
			});
		}

		// Comparing the provided password with the hashed password stored in the database
		const correctPassword = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!correctPassword)
			return res.status(400).json({ error: "Invalid credentials" });

		// Generating a JSON Web Token (JWT) for authentication

		const token = generateCookieToken({
			email: existingUser.email,
			id: existingUser._id,
		});

		// Creates Secure Cookie with token token
		res.cookie("jwt", token, {
			domain: "onrender.com",
			// path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 1 * 60 * 60 * 1000, //1hr
		});

		existingUser.password = null;
		existingUser.updatedAt = null;
		existingUser.createdAt = null;

		res.status(200).json({ loggedInUser: existingUser, token });
	} catch (error) {
		// Handling any errors that occur during the process
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const signOut = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message }); //Internal server error
	}
};

module.exports = {
	signUp,
	signIn,
	signOut,
	activateAccount,
	successRedirect,
};
