const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
	{
		name: String,
		email: String, //To reference to user
		address: String,
		clientFor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
