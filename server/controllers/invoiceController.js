const Invoice = require("../models/invoiceModel");

const createInvoice = async (req, res) => {
  try {
    const invoiceDetails = req.body;

    // invoiceNumber,
    // creatorId,
    // client,
    // items,
    // issueDate,
    // dueDate,
    // vat,
    // subTotal,
    // total,
    // notes,
    // currency,
    // totalAmount,
    // remainingAmount,
    
    const newInvoice = await Invoice.create(invoiceDetails);

    res
      .status(201)
      .json({ message: "Invoice created successfully", newInvoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const { creatorId } = req.body;
    const invoices = await Invoice.find({ creatorId });
    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res
      .status(200)
      .json({ message: "Invoice deleted successfully", deletedInvoice });
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
    invoice.remainingAmount = Math.max(invoice.remainingAmount - amountPaid, 0);
    invoice.invoiceStatus = invoice.remainingAmount === 0 ? 'Paid' : 'Partially Paid';
    invoice.totalAmountReceived += amountPaid;

    // Saving the updated invoice
    await invoice.save();

    // Sending a response indicating successful payment
    res.status(200).json({ message: "Invoice paid successfully" });
  } catch (error) {
    // Handling any errors that occur during the process
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { createInvoice, getAllInvoices, getInvoice, deleteInvoice, payInvoice};
