const mongoose = require("mongoose");


const PayrollSchema = mongoose.Schema(
	{
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
		totalSalary: Number,
		paidAmountTotal: Number,
		paymentStatus: {
			type: String,
			default: "Active"
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
