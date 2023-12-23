const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phoneNumber: String,
		businessName: String,
		contactAddress: String,
		paymentDetails: String,
		invoices: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Invoice",
				default: [],
			},
		],
		clients: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Client",
				default: [],
			},
		],
		employees: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Employee",
				default: [],
			},
		],
		payrolls: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Payroll",
				default: [],
			},
		],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
