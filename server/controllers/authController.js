const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/helper/generateToken");

// Google authentication callback
const googleAuthCallback = async (req, res) => {
	try {
		// Retrieve the user from the Google authentication
		const googleProfile = req.user;

		// Check if the user already exists in your database
		let user = await User.findOne({ email: googleProfile.email }).select("-password");

		// If the user doesn't exist, create a new user in your database
		if (!user) {
			user = await User.create({
				email: googleProfile.email,
				// You may want to include additional user details from the Google profile
			});
		}

		// Generate JWT token
		const token = generateToken({ email: user.email, id: user._id });

        res.cookie("jwt", token, {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 30 * 60 * 1000,
		});

		// Redirect the user or send a response with the token
		res.status(200).json({ user, token });
        console.log({user, token})
	} catch (error) {
		res
			.status(500)
			.json({ message: "Something went wrong during Google authentication" });
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

		// Hashing the password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Creating a new user using the provided email, hashed password, and name
		const newUser = await User.create({
			email,
			password: hashedPassword,
			name,
		});
		// Generating a JSON Web Token (JWT) for authentication

		const token = generateToken({ email: newUser.email, id: newUser._id });

		res.cookie("jwt", token, {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 30 * 60 * 1000,
		});

		// Sending a response with the new user and the generated token
		res.status(200).json({ newUser, token });
	} catch (error) {
		// Handling any errors that occur during the process
		res.status(500).json({ message: "Something went wrong" });
	}
};

const signIn = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Checking if the user exists in the database
		const existingUser = await User.findOne({ email }).select("-password");
		if (!existingUser)
			return res.status(404).json({ error: "User doesn't exist" });

		// Comparing the provided password with the hashed password stored in the database
		const correctPassword = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!correctPassword)
			return res.status(400).json({ error: "Invalid credentials" });

		// Generating a JSON Web Token (JWT) for authentication

		const token = generateToken({
			email: existingUser.email,
			id: existingUser._id,
		});

		// Creates Secure Cookie with token token
		res.cookie("jwt", token, {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.status(200).json({ loggedInUser: existingUser, token });
	} catch (error) {
		// Handling any errors that occur during the process
		res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = { signUp, signIn, googleAuthCallback };
