const express = require('express');
const { payWithMpesa } = require('../controllers/mpesaController');
const router = express.Router();

router.post('/pay', payWithMpesa);

module.exports = router;
