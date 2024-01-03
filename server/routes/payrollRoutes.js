const express = require("express");

const {
	getALlPayroll,
	getPayroll,
	createPayroll,
	updatePayroll,
} = require("../controllers/payrollController");
const { protectedRoute } = require("../middleware/protectedRoute");

const router = express.Router();

router.get("/", protectedRoute, getALlPayroll);
router.get("/:id", protectedRoute, getPayroll);
router.post("/create", protectedRoute, createPayroll);
router.put("/:id", protectedRoute, updatePayroll);

module.exports = router;
