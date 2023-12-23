const express = require('express')

const {createEmployee} = require('../controllers/employeeContoller')

const router = express.Router()

router.post("/",createEmployee )

module.exports = router