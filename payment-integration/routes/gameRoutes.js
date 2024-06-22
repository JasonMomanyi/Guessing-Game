const express = require('express');
const { playGame, getBalance, deposit } = require('../controllers/gameController');
const router = express.Router();

router.post('/play', playGame);
router.get('/balance', getBalance);
router.post('/deposit', deposit);

module.exports = router;
