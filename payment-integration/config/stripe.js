const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCharge = async (amount, source, currency = 'kes') => {
    try {
        const charge = await stripe.charges.create({
            amount: amount * 100, // Stripe uses the smallest currency unit
            source,
            currency,
        });
        return charge;
    } catch (error) {
        console.error('Error creating charge:', error);
        return null;
    }
};

module.exports = { createCharge };
