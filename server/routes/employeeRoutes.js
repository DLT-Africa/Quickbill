const express = require('express')

const {createEmployee, getEmployee, getAllEmployees, deleteEmployee, updateEmployee} = require('../controllers/employeeContoller')

const router = express.Router()

router.post("/create", createEmployee )
router.get("/:id", getEmployee )
router.get("/", getAllEmployees )
router.delete("/:id", deleteEmployee )
router.put("/:id", updateEmployee )

module.exports = router