import React, { useState, useEffect } from 'react';

const MyWalletPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/account/addressesinfo')
      .then((response) => response.json())
      .then((data) => {
        setUser({ address: data.account, balance: data.balance });
      })
      .catch((error) => console.error('Error fetching addresses:', error));
  }, []);

  return (
    <div>
      <h2>My Wallet</h2>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Balance:</strong> {user.balance}</p>
    </div>
  );
};

export default MyWalletPage;
