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

module.exports = { createInvoice, getAllInvoices, getInvoice, deleteInvoice};
