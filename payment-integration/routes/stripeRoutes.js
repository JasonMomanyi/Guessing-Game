const express = require('express');
const { payWithStripe } = require('../controllers/stripeController');
const router = express.Router();

router.post('/pay', payWithStripe);

module.exports = router;
