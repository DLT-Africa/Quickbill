const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
	{
		invoiceNumber: Number,
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		client: { name: String, email: String, address: String },
		paymentDetails: {
			bankName: String,
			accountName: String,
			accountNumber: Number,
		},
		items: [
			{
				itemName: String,
				qty: Number,
				price: Number,
				discPercent: Number,
				amtAfterDiscount: Number,
				discValue: Number,
				amtBeforeDiscount: Number,
			},
		],
		issueDate: Date,
		dueDate: Date,
		// rates: String,
		subTotalBeforeDiscount: Number,
		totalDiscountValue: Number,
		vatPercent: Number,
		vatValue: Number,
		grandTotal: Number,
		notes: String,
		rejectReason: String,
		invoiceStatus: {
			type: String,
			default: "Awaiting Payment",
		},
		currency: String,
		totalAmountReceived: {
			type: Number,
			default: 0,
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
