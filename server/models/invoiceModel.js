const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
	{
		invoiceNumber: String,
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		client: { name: String, email: String, address: String },
		items: [
			{
				itemName: String,
				unitPrice: String,
				quantity: String,
				discount: String,
			},
		],
		issueDate: Date,
		dueDate: Date,
		// rates: String,
		vat: Number,
		subTotal: Number,
		total: Number,
		notes: String,
		InvoiceStatus: {
			type: String,
			default: "awaiting_payment"
		},
		currency: String,
		totalAmount: Number,
		totalAmountReceived: {
			type: Number,
			default: 0
		},
		remainingAmount: Number,
		paymentRecords: [
			{
				amountPaid: Number,
				paymentDate: Date,
				note: String,
				// paidBy: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
