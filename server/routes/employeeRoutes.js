const express = require('express')

const {createEmployee, getEmployee, getAllEmployees, deleteEmployee, updateEmployee, inviteUnregisteredUser} = require('../controllers/employeeContoller')
const {protectedRoute} = require("../middleware/protectedRoute")

const router = express.Router()

router.post("/create", protectedRoute, createEmployee )
router.post("/invite", protectedRoute, inviteUnregisteredUser )
router.get("/:id", protectedRoute, getEmployee )
router.get("/", protectedRoute,  getAllEmployees )
router.delete("/:id",protectedRoute, deleteEmployee )
router.put("/:id", protectedRoute, updateEmployee )

module.exports = router