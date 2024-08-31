const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const TransactionRoutes = require('./routes/TransactionRoutes');
const ExpenseRoutes = require('./routes/ExpenseRoutes');
const cron = require('node-cron');
const axios = require('axios');
const Price = require('./models/Price');

dotenv.config();

const app = express();


connectDB();


app.use(express.json());
app.use('/api/transactions', TransactionRoutes);
app.use('/api/expenses', ExpenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Cron job to fetch Ethereum price every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'ethereum',  
        vs_currencies: 'inr'  
      }
    });

    const price = response.data.ethereum.inr;

    await Price.create({ price });
    console.log('Price updated:', price);
  } catch (error) {
    console.error('Error fetching price:', error);
  }
});
