
const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phoneNumber: String,
	businessName: String,
	contactAddress: String,
	paymentDetails: String,
	employees: [
		{
			name: {
				type: String,
			},
			email: {
				type: String,
			},
			department: {
				type: String,
			},
			jobTitle: {
				type: String,
			},
		},
	],
	ownClients: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Client",
		default: [],
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
