const { createCharge } = require('../config/stripe');

exports.payWithStripe = async (req, res) => {
    const { amount, source } = req.body;
    const result = await createCharge(amount, source);

    if (result) {
        // Simulate a deposit to the user's balance
        userBalance += amount;
        res.status(200).json({ message: 'Payment successful and balance updated.', balance: userBalance });
    } else {
        res.status(500).json({ message: 'Error processing payment' });
    }
};
