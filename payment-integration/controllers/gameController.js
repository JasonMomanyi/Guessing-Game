let userBalance = 0;

exports.playGame = (req, res) => {
    const { guess } = req.body;
    const secretNumber = Math.floor(Math.random() * 6); // Generates a number between 0 and 5

    if (userBalance < 100) {
        return res.status(400).json({ message: "Insufficient balance. Please deposit at least Ksh 100 to play." });
    }

    userBalance -= 100;

    if (guess === secretNumber) {
        userBalance += 1000;
        return res.json({ message: `Congratulations! The secret number was ${secretNumber}. You've won Ksh 1000.`, balance: userBalance });
    } else {
        return res.json({ message: `Sorry, the secret number was ${secretNumber}. You've lost Ksh 100.`, balance: userBalance });
    }
};

exports.getBalance = (req, res) => {
    res.json({ balance: userBalance });
};

exports.deposit = (req, res) => {
    const { amount } = req.body;
    userBalance += amount;
    res.json({ message: `Successfully deposited Ksh ${amount}.`, balance: userBalance });
};
