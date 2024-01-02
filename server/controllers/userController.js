const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");


const updateUserProfile = async (req, res) => {
	const userId = req.userId;
	const { name, email, password } = req.body;
	let { profilePic } = req.body;

	try {
		let user = await User.findById(userId);

		if (password) {
			const hashedPassword = await bcrypt.hash(password, 12);
			user.password = hashedPassword;
		}

		if (profilePic) {
			if (user.profilePic) {
				await cloudinary.uploader.destroy(
					user.profilePic.split("/").pop().split(".")[0]
				);
			}
			const uploadedResponse = await cloudinary.uploader.upload(profilePic);
			profilePic = uploadedResponse.secure_url;
			console.log(profilePic)
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.avatar = profilePic || user.avatar;

		user = await user.save();

		user.password = null;

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getUserProfile = async (req, res) => {
	try {
		const userId = req.userId;

		const user = await User.findById(userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password");

		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	// deleteUser,
	updateUserProfile,
	getUserProfile,
	getAllUsers,
};
