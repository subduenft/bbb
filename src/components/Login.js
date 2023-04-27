import React, { useState } from "react";
import Web3 from "web3";

function Login() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccountAddress(accounts[0]);
        setIsConnected(true);

        // get account balance of payment token (WETH)
        const paymentTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        const paymentTokenContract = new web3.eth.Contract(
          require("@openzeppelin/contracts/build/contracts/IERC20.json"),
          paymentTokenAddress
        );
        const balance = await paymentTokenContract.methods
          .balanceOf(accounts[0])
          .call();
        setAccountBalance(balance);
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
