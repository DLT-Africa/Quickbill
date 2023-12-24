const express = require("express");

const { createInvoice, getAllInvoices, getInvoice, deleteInvoice } = require("../controllers/invoiceController");

const router = express.Router();

router.post("/create", createInvoice);
router.get("/", getAllInvoices)
router.get("/:id", getInvoice)
router.delete("/:id", deleteInvoice)


module.exports = router;
