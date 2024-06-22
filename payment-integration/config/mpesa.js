const axios = require('axios');
require('dotenv').config();

const getToken = async () => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const buffer = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const headers = { Authorization: `Basic ${buffer}` };

    try {
        const response = await axios.get(url, { headers });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

const stkPush = async (phone, amount, accountReference) => {
    const token = await getToken();
    if (!token) return null;

    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const headers = { Authorization: `Bearer ${token}` };
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const shortCode = process.env.MPESA_SHORTCODE;
    const passKey = process.env.MPESA_PASSKEY;
    const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString('base64');

    const data = {
        "BusinessShortCode": shortCode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": shortCode,
        "PhoneNumber": phone,
        "CallBackURL": process.env.MPESA_CALLBACK_URL,
        "AccountReference": accountReference,
        "TransactionDesc": "Payment"
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error in STK Push:', error);
        return null;
    }
};

module.exports = { stkPush };
