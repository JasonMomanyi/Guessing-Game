const { stkPush } = require('../config/mpesa');

exports.payWithMpesa = async (req, res) => {
    const { phone, amount } = req.body;
    const accountReference = "GuessingGame";
    const result = await stkPush(phone, amount, accountReference);

    if (result) {
        // Simulate a deposit to the user's balance
        userBalance += amount;
        res.status(200).json({ message: 'Payment successful and balance updated.', balance: userBalance });
    } else {
        res.status(500).json({ message: 'Error processing payment' });
    }
};
