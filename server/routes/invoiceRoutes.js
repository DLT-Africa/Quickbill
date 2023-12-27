const express = require("express");

const { createInvoice, getAllInvoices, getInvoice, deleteInvoice, payInvoice } = require("../controllers/invoiceController");
const {protectedRoute} = require("../middleware/protectedRoute")

const router = express.Router();

// Create a new invoice
router.post("/create", protectedRoute, createInvoice);

// Get all invoices
router.get("/", protectedRoute, getAllInvoices);

// Get a specific invoice by ID
router.get("/:id", protectedRoute, getInvoice);

// Update a specific invoice by ID to mark it as paid
router.put("/:id",protectedRoute, payInvoice);

// Delete a specific invoice by ID
router.delete("/:id", protectedRoute, deleteInvoice);


module.exports = router;
