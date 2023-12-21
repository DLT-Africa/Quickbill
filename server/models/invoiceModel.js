const mongoose = require ("mongoose");

const invoiceSchema = mongoose.Schema({
    invoiceNumber: String,
    items: [ { itemName: String, unitPrice: String, quantity: String, discount: String } ],
    dueDate: Date,
    rates: String,
    vat: Number,
    total: Number,
    subTotal: Number,
    notes: String,
    status: String,
    currency: String,
    totalAmountReceived: Number,
    creator: String,
    client: { name: String, email: String, address: String },
    paymentRecords: [ {amountPaid: Number, datePaid: Date, paymentMethod: String, note: String, paidBy: String } ],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;