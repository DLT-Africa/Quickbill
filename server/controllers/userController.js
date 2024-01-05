const Client = require("../models/clientModel");
const Employee = require("../models/employeeModel");
const Invoice = require("../models/invoiceModel");
const Payroll = require("../models/payrollModel");
const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const { generateCookieToken } = require("../utils/generateToken");
const express = require("express");
const app = express();


const updateEmailInOtherModels = async (oldEmail, newEmail) => {
	await Invoice.updateMany(
		{ "client.email": oldEmail },
		{ $set: { "client.email": newEmail } }
	);
	await Employee.updateMany({ email: oldEmail }, { email: newEmail });
	await Client.updateMany({ email: oldEmail }, { email: newEmail });
	// Add more updates for other models if needed
};

const updateUserProfile = async (req, res) => {
	const userId = req.userId;
	const { name, email, password } = req.body;
	let { profilePic } = req.body;
	const newEmail = email;

	try {
		let user = await User.findById(userId);
		const oldEmail = user.email;

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
			console.log(profilePic);
		}

		if (newEmail !== oldEmail) {
			await updateEmailInOtherModels(oldEmail, newEmail);
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

const getProfileByEmail = async (req, res) => {
	try {

		if (req.session.user) {
			// const email = req.user.email;
			// console.log(email);
			// const user = await User.findOne({ email: email });

			// if (!user) {
			// 	return res.status(404).json({ error: "User not found" });
			// }

			// const token = generateCookieToken({
			// 	email: user.email,
			// 	id: user._id,
			// });

			// // Creates Secure Cookie with token token
			// res.cookie("jwt", token, {
			// 	httpOnly: true,
			// 	secure: true,
			// 	sameSite: "None",
			// 	maxAge: 1 * 60 * 60 * 1000, //1hr
			// });
			const user = req.session.user

			return res.status(200).json(user);
		} else {
			return res.status(401).json({ error: "Unauthorized" });
		}
	} catch (error) {
		console.log(error);
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
	getProfileByEmail,
};
