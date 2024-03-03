import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import './CSS/TransferPage.css';

const TransferPage = () => {
  const { address } = useParams();
  const [transferData, setTransferData] = useState({
    fromAddress: '', 
    toAddress: '',
    inputValue: '',
    showReceipt: false,
    showHash: undefined,
    showBlockHash: undefined,
    showBlockNumber: 1,
    showGasFee: '21000',
  });
  const [allAddresses, setAllAddresses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/account/addresses')
      .then((response) => response.json())
      .then((data) => {
        const firstAddress = data.addresses[0];
        setTransferData((prevTransferData) => ({
          ...prevTransferData,
          fromAddress: firstAddress,
        }));
        setAllAddresses(data.addresses.slice(1)); // Exclude the first address from the list
      })
      .catch((error) => console.error('Error fetching addresses:', error));
  }, []);

  const handleChange = (field, value) => {
    setTransferData({ ...transferData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fromAddress, toAddress, inputValue } = transferData;

    try {
      // Send a POST request to the server
      const response = await fetch('http://localhost:3001/transaction/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: fromAddress,
          destination: toAddress,
          value: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Transaction failed');
      }


      setTransferData({
        ...transferData,
        showHash: Base64.stringify(sha256(fromAddress + toAddress + inputValue)),
        showBlockHash: Base64.stringify(sha256(inputValue)),
        showBlockNumber: transferData.showBlockNumber + 1,
        showReceipt: true,
      });

      alert('Transaction successful!');
    } catch (error) {
      setTransferData({
        ...transferData,
        showReceipt: false,
      });

      alert(error);
    }
  };

  return (
    <div className="transfer-container">
      <h1>Transfer</h1>
      <div className="from-to-details">
        <p>
          From: <strong>{transferData.fromAddress}</strong>
        </p>
        <label>
          To:
          <select
            value={transferData.toAddress}
            onChange={(e) => handleChange('toAddress', e.target.value)}
          >
            <option value="">Select an address</option>
            {allAddresses.map((addr) => (
              <option key={addr} value={addr}>
                {addr}
              </option>
            ))}
        </select>
        </label>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Amount: </label>
          <input
            type="number"
            placeholder="Enter Amount..."
            value={transferData.inputValue}
            onChange={(e) => handleChange('inputValue', e.target.value)}
          />
          <button className="zoom" type="submit">
            Submit
          </button>
        </form>
      </div>

      {transferData.showReceipt && (
        <div className="receipt">
          <h1>Receipt</h1>
          <p>Transaction Hash: {transferData.showHash}</p>
          <p>Block Hash: {transferData.showBlockHash}</p>
          <p>Block number: {transferData.showBlockNumber}</p>
          <p>From: {transferData.fromAddress}</p>
          <p>To: {transferData.toAddress}</p>
          <p>Gas Used: {transferData.showGasFee}</p>
        </div>
      )}
    </div>
  );
};

export default TransferPage;
