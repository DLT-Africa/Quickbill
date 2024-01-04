const mongoose = require("mongoose");

const PayrollSchema = mongoose.Schema(
	{
		payrollNumber: { type: String, required: true },
		employerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		employeeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee",
			required: true,
		},
		salary: Number,
		bankName: String,
		accountName: String,
		accountNumber: Number,
		note: String,
		paymentDate: Date,
		currency: String,
		paymentStatus: {
			type: String,
		},
		// Other payroll details
	},
	{
		timestamps: true,
	}
);

const Payroll = mongoose.model("Payroll", PayrollSchema);

module.exports = Payroll;
