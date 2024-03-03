const accountAddresses = [
    { account: "0xD06284664319742513E2244e5149f93B0914B409", balance: 140  },
    { account: "0x38aF4393f4D7ab250E50C7f424B6D08E25a33FF8", balance: 150 },
    { account: "0x34s8s93f4G9sab25J77SKSF424B6D08E25a3DJF8", balance: 100 },
    { account: "0x34s0sFkdk8Dk424B6D08E25kdh97JSSJ7JK97H08", balance: 200 },
  ];
  
  function getAddresses() {
    return accountAddresses.map((account) => account.account);
  }
  
  function getuser(){
    return accountAddresses[0];
  }

  function getBalance(address) {
    const selectedAccount = accountAddresses.find(
      (account) => account.account === address
    );
  
    return selectedAccount ? selectedAccount.balance : null;
  }

  function updateBalance(address, newBalance) {
    const index = accountAddresses.findIndex((accountAddresses) => accountAddresses.account === address);
    console.log(address, newBalance, index)
    if (index !== -1) {
      accountAddresses[index].balance = newBalance;
      return true;
    }
    return false; 
  }
  
  module.exports = {
    getAddresses,
    getBalance,
    getuser,
    updateBalance
  };
  