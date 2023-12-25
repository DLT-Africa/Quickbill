const express = require("express");

const { createInvoice, getAllInvoices, getInvoice, deleteInvoice, payInvoice } = require("../controllers/invoiceController");

const router = express.Router();

// Create a new invoice
router.post("/create", createInvoice);

// Get all invoices
router.get("/", getAllInvoices);

// Get a specific invoice by ID
router.get("/:id", getInvoice);

// Update a specific invoice by ID to mark it as paid
router.put("/:id", payInvoice);

// Delete a specific invoice by ID
router.delete("/:id", deleteInvoice);


module.exports = router;
