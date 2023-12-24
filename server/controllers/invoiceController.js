
const Invoice = require("../models/invoiceModel");

const createInvoice = async (req, res) => {
	try {
		const {
			invoiceNumber,
			creatorId,
			client,
			items,
			issueDate,
			dueDate,
			vat,
			subTotal,
			total,
			notes,
			invoiceStatus,
			currency,
			totalAmount,
			totalAmountReceived,
			remainingAmount,
		} = req.body;

		const newInvoice = await Invoice.create({
			invoiceNumber,
			creatorId,
			client,
			items,
			issueDate,
			dueDate,
			vat,
			subTotal,
			total,
			notes,
			invoiceStatus,
			currency,
			totalAmount,
			totalAmountReceived,
			remainingAmount,
		});

		res
			.status(201)
			.json({ message: "Invoice created successfully", newInvoice });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = { createInvoice };
