const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
	{
		employerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		email: {
			//To reference to his User Model
			type: String,
			required: true,
		},
		name: String,
		department: {
			type: String,
		},
		jobTitle: {
			type: String,
		},
		payroll: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Payroll",
		},
	},
	{
		timestamps: true,
	}
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
