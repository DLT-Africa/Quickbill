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
		status: String,
		currency: String,
		totalAmount: Number,
		totalAmountReceived: Number,
		remainingAmount: Number,
		status: String,
		paymentRecords: [
			{
				amountPaid: Number,
				paymentDate: Date,
				paymentMethod: String,
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
