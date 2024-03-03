import React, { useState, useEffect } from 'react';
import './CSS/TransactionPage.css';


const TransactionPage = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/transaction/history');
        const data = await response.json();
        setTransactionHistory(data);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };
  
    fetchData();
  }, []);
  


  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactionHistory.map((transaction, index) => (
          <li key={index}>
            <strong>Transaction Hash:</strong> {transaction._id}<br />
            <strong>Status:</strong> {transaction.status}<br />
            <strong>Timestamp:</strong> {transaction.timestamp}<br />
            <strong>From:</strong> {transaction.source}<br />
            <strong>To:</strong> {transaction.destination}<br />
            <strong>Value:</strong> {transaction.amount}<br />
            <strong>Gas Use:</strong> {transaction.gasUsed}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionPage;
