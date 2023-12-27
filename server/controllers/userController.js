const User = require("../models/userModel");

// const deleteUser = async (req, res) => {
// 	try {
// 		const userId = req.params.id;

// 		const deletedUser = await User.findByIdAndDelete(userId);

// 		if (!deletedUser) {
// 			return res.status(404).json({ error: "User not found" });
// 		}

// 		res.status(200).json({ message: "User deleted successfully", deletedUser });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

const updateUserProfile = async (req, res) => {
	try {
		const userId = req.userId;
		const updateData = req.body;

		const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
			new: true,
			runValidators: true,
		}).select("-password");

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ message: "User updated successfully", updatedUser });
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
