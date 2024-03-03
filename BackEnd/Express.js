///Name: Lo Ching hei
///ID: 101486171
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

//accountsModule and transactionModule
const accountsModule = require('./accounts');
const transactionModule = require('./transactions');

// GET request for /account/addresses
app.get('/account/addresses', (req, res) => {
  const addresses = accountsModule.getAddresses();
  console.log(addresses)
  res.json({ addresses });
});
// GET request for /account/addressinfo
app.get('/account/addressesinfo', (req, res) => {
  const addresses = accountsModule.getuser();
  console.log(addresses);
  res.json({ addresses });
});

// GET request for /account/balance
app.get('/account/balance', (req, res) => {
  const address = req.query.address;
  const balance = accountsModule.getBalance(address);
  if (balance !== null) {
    res.json({ balance });
  } else {
    res.status(404).json({ error: 'Account not found' });
  }
});

app.get('/transaction/history', async (req, res) => {
  const transactionHistoryPromise = transactionModule.getTransactionHistory();
  try {
    const transactionHistory = await transactionHistoryPromise;
    res.json(transactionHistory);
  } catch (error) {
    // Handle any errors that occurred during the asynchronous operation
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request for /transaction/send 
app.post('/transaction/send', (req, res) => {
  console.log(req.body);
  const { source, destination, value } = req.body;

  if (!source || !destination || !value) {
    return res.status(400).json({ error: 'Invalid request parameters' });
  }

  const transactionResult = transactionModule.sendTransaction(source, destination, value);

  if (transactionResult.error) {
    return res.status(400).json({ error: transactionResult.error });
  }

  // If the transaction was successful ---> send the receipt
  res.json({ receipt: transactionResult });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
