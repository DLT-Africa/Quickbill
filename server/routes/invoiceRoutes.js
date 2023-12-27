const express = require("express");

const { createInvoice, getAllInvoices, getInvoice, rejectInvoice, payInvoice } = require("../controllers/invoiceController");
const {protectedRoute} = require("../middleware/protectedRoute")

const router = express.Router();

// Create a new invoice
router.post("/create", protectedRoute, createInvoice);

// Get all invoices
router.get("/", protectedRoute, getAllInvoices);

// Get a specific invoice by ID
router.get("/:id", protectedRoute, getInvoice);

// Update a specific invoice by ID to mark it as paid
router.put("/pay/:id",protectedRoute, payInvoice);

// Reject a specific invoice by ID
router.post("/reject/:id", protectedRoute, rejectInvoice);


module.exports = router;
