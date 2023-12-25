const express = require('express');

const { getALlPayroll, getPayroll, createPayroll, voidPayroll } = require('../controllers/payrollController');

const router = express.Router()

router.get('/', getALlPayroll)
router.get('/:id', getPayroll)
router.post('/', createPayroll)
router.put('/:id', voidPayroll)

module.exports = router