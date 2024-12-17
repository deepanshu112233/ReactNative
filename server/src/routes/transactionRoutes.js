const express = require('express');
const { addTransaction } = require('../controllers/transactionController');
const router = express.Router();

router.post('/transfer', addTransaction);

module.exports = router;
