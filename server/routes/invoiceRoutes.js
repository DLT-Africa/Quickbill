const express = require("express");

const { createInvoice } = require("../controllers/invoiceController");

const router = express.Router();

router.post("/", createInvoice);

module.exports = router;
