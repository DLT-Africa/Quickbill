const Payroll = require("../models/payrollModel.js");

const getALlPayroll = async (req, res) => {
	try {
		//From middleware
		const employerId = req.userId;

		const payroll = await Payroll.find({ employerId: employerId })
			.populate("employeeId")
			.sort({ createdAt: -1 })
			.exec();

		res.status(200).json(payroll);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getPayroll = async (req, res) => {
	try {
		const { id } = req.params;
		const payroll = await Payroll.findById(id);
		res.status(200).json(payroll);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const createPayroll = async (req, res) => {
	try {
		const { payrollDetails } = req.body;

		//From middleware
		const employerId = req.userId;
		const newPayroll = new Payroll({ ...payrollDetails, employerId });
		await newPayroll.save();
		const payroll = await Payroll.find({ employerId: employerId })
			.populate("employeeId")
			.sort({ createdAt: -1 })
			.exec();

		res.status(200).json(payroll);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const updatePayroll = async (req, res) => {
	try {
		const { id } = req.params;
		const { updatePayroll } = req.body;
		const employerId = req.userId;

		// const payroll = await Payroll.findById(id);
		const updatedPayroll = await Payroll.findByIdAndUpdate(id, updatePayroll, {
			new: true,
		});

		const payroll = await Payroll.find({ employerId: employerId })
			.populate("employeeId")
			.sort({ createdAt: -1 })
			.exec();

		res.status(200).json(payroll);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = { getALlPayroll, getPayroll, createPayroll, updatePayroll };
