const express = require('express')

const {createEmployee} = require('../controllers/employeeContoller')

const router = express.Router()

router.post("/create", createEmployee )

module.exports = router