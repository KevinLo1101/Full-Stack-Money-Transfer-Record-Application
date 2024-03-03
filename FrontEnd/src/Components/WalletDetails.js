import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const WalletDetails = () => {
  const { address } = useParams();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    // Fetch balance based on the provided address
    fetch(`http://localhost:3001/account/balance?address=${address}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Account not found');
        }
        return response.json();
      })
      .then((data) => {
        setBalance(data.balance);
      })
      .catch((error) => console.error('Error fetching balance:', error));
  }, [address]);

  return (
    <div>
      <h2>Wallet Information</h2>
      <p>
        <strong>Address:</strong> {address}
      </p>
      <p>
          <strong>Balance:</strong> {balance}
       </p>
    </div>
  );
};

export default WalletDetails;
