import ReactDOM from "react-dom/client";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionPage from "./Components/TransactionPage";
import AddressPage from "./Components/AddressPage";
import Layout from "./Components/Layout";
import TransferPage from "./Components/TransferPage"
import WalletDetails from "./Components/WalletDetails";
import MyWalletPage from "./Components/MyWalletPage";
import './App.css';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TransactionPage />} />
          <Route path="AddressPage" element={<AddressPage />} />
          <Route path="/Transfer" element={<TransferPage/>} />
          <Route path="AddressPage/Wallet/:address" element={<WalletDetails/>} />
          <Route path="Mywallet" element={<MyWalletPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);