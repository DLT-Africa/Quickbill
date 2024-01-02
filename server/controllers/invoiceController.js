const Invoice = require("../models/invoiceModel");

const createInvoice = async (req, res) => {
	try {
		const {
			invoiceNumber,
			client,
			items,
			issueDate,
			dueDate,
			subTotalBeforeDiscount,
			totalDiscountValue,
			vatPercent,
			vatValue,
			paymentDetails,
			grandTotal,
			notes,
			currency,
			remainingAmount,
		} = req.body;

		const creatorId = req.userId;

		const newInvoice = await Invoice.create({
			invoiceNumber,
			creatorId,
			client,
			items,
			issueDate,
			dueDate,
			paymentDetails,
			subTotalBeforeDiscount,
			totalDiscountValue,
			vatPercent,
			vatValue,
			grandTotal,
			notes,
			currency,
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

const getAllSentInvoices = async (req, res) => {
	try {
		const creatorId = req.userId;
		const invoices = await Invoice.find({ creatorId })
			.sort({ createdAt: -1 })
			.populate({
				path: "creatorId",
				select: "name email", // Select the fields you want to populate
			})
			.exec();

			// Update overdue status using forEach
			invoices.forEach(async (invoice) => {
				// Check if the invoice is not paid or rejected and is overdue
				if (
					invoice.invoiceStatus !== "Paid" &&
					invoice.invoiceStatus !== "Rejected" &&
					invoice.dueDate < new Date()
				) {
					// Update the invoiceStatus to "Overdue"
					invoice.invoiceStatus = "Overdue";
					// Save the updated invoice
					await invoice.save();
				}
			});
	
		res.status(200).json(invoices);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getAllReceivedInvoices = async (req, res) => {
	try {
		const userEmail = req.userEmail;

		const invoices = await Invoice.find({ "client.email": userEmail })
			.sort({ createdAt: -1 })
			.populate({
				path: "creatorId",
				select: "name email", // Select the fields you want to populate
			})
			.exec();

			// Update overdue status using forEach
			invoices.forEach(async (invoice) => {
				// Check if the invoice is not paid or rejected and is overdue
				if (
					invoice.invoiceStatus !== "Paid" &&
					invoice.invoiceStatus !== "Rejected" &&
					invoice.dueDate < new Date()
				) {
					// Update the invoiceStatus to "Overdue"
					invoice.invoiceStatus = "Overdue";
					// Save the updated invoice
					await invoice.save();
				}
			});
	
		res.status(200).json(invoices);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getInvoice = async (req, res) => {
	try {
		const invoiceId = req.params.id;
		const invoice = await Invoice.findById(invoiceId).populate({
			path: "creatorId",
			select: "name email", // Select the fields you want to populate
		});

		if (!invoice) {
			return res.status(404).json({ error: "Invoice not found" });
		}

		res.status(200).json(invoice);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const rejectInvoice = async (req, res) => {
	try {
		const invoiceId = req.params.id;
		const {rejectReason}  = req.body;

		const invoice = await Invoice.findById(invoiceId);

		if (!invoice) {
			return res.status(404).json({ error: "Invoice not found" });
		}

		invoice.invoiceStatus = "Rejected";
		invoice.rejectReason = rejectReason;

		const rejectedInvoice = await invoice.save();

		res
			.status(200)
			.json({ message: "Invoice rejected successfully", rejectedInvoice });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const payInvoice = async (req, res) => {
	try {
		// Extracting the invoice ID from the request parameters
		const invoiceId = req.params.id;

		// Extracting the amountPaid from the request body
		const { amountPaid, note } = req.body;

		// Finding the invoice by its ID
		const invoice = await Invoice.findById(invoiceId);
		if (!invoice) {
			// If the invoice is not found, return a 404 error response
			return res.status(404).json({ error: "Invoice not found" });
		}

		// Creating paymentDetails object with the amount and payment date
		const paymentDetails = {
			amountPaid,
			note,
			paymentDate: new Date(),
		};

		// Updating the invoice with the new payment details and calculate remaining amount
		invoice.paymentRecords.push(paymentDetails);
		invoice.remainingAmount = Math.max(
			invoice.remainingAmount - Number(amountPaid),
			0
		);
		invoice.invoiceStatus =
			invoice.remainingAmount === 0 ? "Paid" : "Partially Paid";
		invoice.totalAmountReceived += Number(amountPaid);

		// Saving the updated invoice
		await invoice.save();

		// Sending a response indicating successful payment
		res.status(200).json({ message: "Invoice paid successfully" });
	} catch (error) {
		// Handling any errors that occur during the process
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	createInvoice,
	getAllSentInvoices,
	getInvoice,
	rejectInvoice,
	getAllReceivedInvoices,
	payInvoice,
};
