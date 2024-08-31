const express = require('express');
const Transaction = require('../models/Transaction');
const Price = require('../models/Price');
const router = express.Router();

router.get('/:address', async (req, res) => {
  const { address } = req.params;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    // total expenses
    const transactions = await Transaction.find({ address });

    if (!transactions.length) {
      return res.status(404).json({ error: 'No transactions found ' });
    }

    const totalExpenses = transactions.reduce((sum, tx) => {
      const gas = parseFloat(tx.gas);
      const gasPrice = parseFloat(tx.gasPrice);
      return sum + (gas * gasPrice) / 1e18;
    }, 0);

    // Retrieve current Ethereum price
    const currentPriceData = await Price.findOne().sort({ createdAt: -1 });

    if (!currentPriceData) {
      return res.status(404).json({ error: 'Current Ethereum price not found' });
    }

    res.status(200).json({
      totalExpenses,
      currentEthPrice: currentPriceData.price
    });
  } catch (error) {
    console.error('Error calculating expenses:', error);
    res.status(500).json({ error: 'Failed to calculate expenses' });
  }
});

module.exports = router;
