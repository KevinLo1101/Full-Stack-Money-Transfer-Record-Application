const mongoose = require('mongoose');
const Transaction = require('./transactionHistory');
const Base64 = require('crypto-js/enc-base64');
const sha256 = require('crypto-js/sha256');
const accountsModule = require('./accounts');
const TransactionsHistory = [
    { TransactionHash: '0x2446f1fd773fbb9f080e67db8765678shgajhe987413cf28a2a4a6da9bh87d6a', 
        Status: 'Success', 
        Timestamp: '2023-09-23T04:0803.172Z', 
        From: '0xD06284664319742513E2244e5149f93B0914B409', 
        To: '0x1342342d53F17d6df2426029cDC7d41e34123423', 
        Value: '10', 
        GasUse: '21000' 
    },
    { TransactionHash: '0x28h866ffd783ffb9f080u6shik8g6a03c7ed7427c9c9413cf28a2a4a6da9b56c', 
        Status: 'Success', 
        Timestamp: '2023-09-29T04:2307.172Z', 
        From: '0xD06284664319742513E2244e5149f93B0914B409', 
        To: '0x736514Db74DbF23e901A60DAEbaE97f8e9b09873', 
        Value: '20', 
        GasUse: '20000' 
    },
  ];

  //function getTransactionHistory() {
    //return TransactionsHistory;
  //}/////////////////
  function getTransactionHistory() {
    try {
        mongoose.connect('mongodb://localhost:27017/Project', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
  
      const transactionsHistory = Transaction.find({});
      return transactionsHistory;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      throw error; 
    }
  }
  ////////////////////

  async function sendTransaction(source, destination, value) {
    // Check if the source address exists
    const sourceBalance = accountsModule.getBalance(source);
    const Value = parseInt(value);
    if (sourceBalance === null) {
      return { error: 'Source address not found' };
    }
  
    
    if (Value > sourceBalance) {      // Check if the source account have enough balance
      return { error: 'Insufficient funds' };
    }
  
   
    accountsModule.updateBalance(source, sourceBalance - Value);
  
  
    const destinationBalance = accountsModule.getBalance(destination);
    if (destinationBalance !== null) {
      accountsModule.updateBalance(destination, destinationBalance + Value);
    } else {
      return { error: 'Destination address not found' };
    }
    // MongoDB database
    mongoose.connect('mongodb://localhost:27017/Project', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
    const ReceiptHash= Base64.stringify(sha256(source + destination + value));
    //console.log(ReceiptHash);

    // Create a new transaction
    const newTransaction = new Transaction({
      source: source,
      destination: destination,
      amount: value,
      status: 'Success',
      gasUsed: 21000, 
      receiptHash: ReceiptHash,
    });
  
    // Save the transaction --------> MongoDB database
    try {
      await newTransaction.save();
      console.log('Transaction saved successfully');
    } catch (error) {
      console.error('Error saving transaction:', error);
      return { error: 'Error saving transaction' };
    }
  
    TransactionsHistory.push({
      TransactionHash: newTransaction._id,
      Status: newTransaction.status,
      Timestamp: newTransaction.timestamp,
      From: newTransaction.source,
      To: newTransaction.destination,
      Value: newTransaction.amount.toString(),
      GasUse: newTransaction.gasUsed.toString(),
    });
  
    return newTransaction.toObject(); 
  }
  
  module.exports = {
    getTransactionHistory,
    sendTransaction,
  };