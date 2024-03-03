
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './CSS/AddressPage.css';

//All avaliable transaction address.
const AddressPage=()=> {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    // Fetch data with Get require
    fetch('http://localhost:3001/account/addresses')
      .then((response) => response.json())
      .then((data) => {
        setAddresses(data.addresses);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Account Addresses</h2>
      <div id='list'>
            <ul>
                {addresses.map((address, index) => (
                <li key={index}>
                  <Link to={`Wallet/${address}`} className="address-link">
                    {address}
                  </Link>
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
}

export default AddressPage;

