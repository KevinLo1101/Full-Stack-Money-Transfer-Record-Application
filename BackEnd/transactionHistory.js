//Mongo DB
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  gasUsed: {
    type: Number,
  },
  receiptHash: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
