const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  blockNumber: String,
  timeStamp: String,
  hash: String,
  from: String,
  to: String,
  value: String,
  gas: String,
  gasPrice: String,
  isError: String,
  txreceipt_status: String,
  address: String
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
