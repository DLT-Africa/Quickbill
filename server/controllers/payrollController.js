const Payroll = require("../models/payrollModel.js");

const getALlPayroll = async (req, res) => {
	try {
		//From middleware
		const employerId = req.userId;

		const payroll = await Payroll.find({ employerId: employerId })
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
		const { employeeId, totalSalary } = req.body;
        
		//From middleware
		const employerId = req.userId;
		const newPayroll = new Payroll({ employerId, employeeId, totalSalary });
		await newPayroll.save();
		res.status(201).json(newPayroll);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const voidPayroll = async (req, res) => {
	try {
		const { id } = req.params;
		const payroll = await Payroll.findById(id);
		payroll.paymentStatus = "voided";
		const voidedPAyroll = await payroll.save();

		res.status(200).json(voidedPAyroll);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = { getALlPayroll, getPayroll, createPayroll, voidPayroll };
