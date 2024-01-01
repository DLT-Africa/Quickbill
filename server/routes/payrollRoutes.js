const express = require("express");

const {
	getALlPayroll,
	getPayroll,
	createPayroll,
	voidPayroll,
} = require("../controllers/payrollController");
const { protectedRoute } = require("../middleware/protectedRoute");

const router = express.Router();

router.get("/", protectedRoute, getALlPayroll);
router.get("/:id", protectedRoute, getPayroll);
router.post("/create", protectedRoute, createPayroll);
router.put("/:id", protectedRoute, voidPayroll);

module.exports = router;
