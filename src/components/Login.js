import React, { useState } from "react";
import Web3 from "web3";
import { getContract, wethTokenAddress } from "../DataContext";

function Login({ onLogin }) {
  const wethAddress = wethTokenAddress();
  const wethContract = getContract(wethAddress);

  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const windowWeb3 = new Web3(window.ethereum);
        const accounts = await windowWeb3.eth.getAccounts();
        const account = accounts[0];

        setAccountAddress(account);
        setIsConnected(true);

        // get account balance of payment token (WETH)
        const balance = await wethContract.methods.balanceOf(account).call();
        setAccountBalance(balance);

        // Pass the connected account to the parent App component
        onLogin(account);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }

  return (
    <div>
      <button onClick={connectWallet}>
        {isConnected ? accountAddress : "Connect Wallet"}
      </button>
      {isConnected && (
        <p>
          Balance: {Web3.utils.fromWei(accountBalance.toString(), "ether")} WETH
        </p>
      )}
    </div>
  );
}

export default Login;
