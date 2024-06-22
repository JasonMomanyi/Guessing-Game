const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');
const mpesaRoutes = require('./routes/mpesaRoutes');
const stripeRoutes = require('./routes/stripeRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/game', gameRoutes);
app.use('/mpesa', mpesaRoutes);
app.use('/stripe', stripeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
