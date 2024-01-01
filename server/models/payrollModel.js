const mongoose = require("mongoose");

const PayrollSchema = mongoose.Schema(
	{
		payrollNumber: { type: String, unique: true },
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
		paidAmountTotal: Number,
		note: String,
		currency: String,
		paymentStatus: {
			type: String,
		},
		paymentRecords: [
			{
				amountPaid: Number,
				paymentDate: Date,
				// paymentMethod: String,
				note: String,
				// paidBy: String,
			},
		],
		// Other payroll details
	},
	{
		timestamps: true,
	}
);

const Payroll = mongoose.model("Payroll", PayrollSchema);

module.exports = Payroll;
