const Employee = require("../models/employeeModel");
const User = require("../models/userModel");

const createEmployee = async (req, res) => {
	try {
		const { email, name, department, jobTitle } = req.body;
		const employerId = req.userId
		const userEmail = req.userEmail

		if(email === userEmail) {
			return res.status(400).json({ error: "You cannot register yourself as an employee" });
		  }

		const employeeAsRegisteredUser = await User.findOne({ email });

		if (!employeeAsRegisteredUser) {
			return res
				.status(404)
				.json({ error: "This email is not a registered user" });
		}

		//If employee is already an employee of the employer, return an error
		const existingEmployee = await Employee.findOne({ email, employerId });

		if (existingEmployee) {
			return res.status(400).json({ error: "You have registered this employee already" });
		}

		//Create a new employee
		const newEmployee = await Employee.create({
			employerId,
			email,
			name,
			department,
			jobTitle,
		});

		
		res.status(201).json({
			message: "Employee created successfully",
			newEmployee,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};
const getEmployee = async (req, res) => {
	// res.send("employee")
	try {
		const employeeId = req.params.id;

		const employee = await Employee.findById(employeeId);

		if (!employee) {
			return res.status(404).json({ error: "Employee not found" });
		}

		res.status(200).json(employee);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getAllEmployees = async (req, res) => {
	try {
		const employerId  = req.userId;

		const employees = await Employee.find({ employerId });

		res.status(200).json(employees);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const deleteEmployee = async (req, res) => {
	try {
		const employeeId = req.params.id;

		const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

		if (!deletedEmployee) {
			return res.status(404).json({ error: "Employee not found" });
		}

		res
			.status(200)
			.json({ message: "Employee deleted successfully", deletedEmployee });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const updateEmployee = async (req, res) => {
	try {
		const employeeId = req.params.id;
		const updateData = req.body;

		const updatedEmployee = await Employee.findByIdAndUpdate(
			employeeId,
			updateData,
			{ new: true, runValidators: true }
		);

		if (!updatedEmployee) {
			return res.status(404).json({ error: "Employee not found" });
		}

		res
			.status(200)
			.json({ message: "Employee updated successfully", updatedEmployee });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	createEmployee,
	getEmployee,
	getAllEmployees,
	deleteEmployee,
	updateEmployee,
};
