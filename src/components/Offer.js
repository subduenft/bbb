import React, { useState } from "react";
import { OpenSeaPort, Network, getOrderHash, signOrderHash } from "opensea-js";
import Web3 from "web3";
import { osApiKey, networkName, getContract, etherscanApiKey, web3instance } from "../DataContext";

const etherscanApi = etherscanApiKey();
const osApi = osApiKey();
const opensea = require('opensea-js');


export async function makeOffer(account, nftContractAddress, tokenId, offerAmount) {
  try {
    // Check if a MetaMask account is connected
    const provider = window.ethereum;
    if (!provider) {
      throw new Error("Please connect to MetaMask.");
    }

    // Prompt for MetaMask account connection
    await provider.request({ method: "eth_requestAccounts" });

    const web3 = web3instance();
    // console.log(web3.currentProvider);
    const seaport = await new opensea.OpenSeaPort(web3.currentProvider, {
      networkName: opensea.Network.Main,
      apiKey: osApi,
    });

    // const accounts = await web3.eth.getAccounts();
    // const account = accounts[0];

    console.log(account);
    console.log(nftContractAddress);
    console.log(tokenId);
    console.log(offerAmount);

    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 30); // 30 days from now 
    const order = await seaport.createBuyOrder({
      asset: {
        tokenId: tokenId,
        tokenAddress: nftContractAddress,
      },
      accountAddress: account,
      startAmount: Web3.utils.toWei(offerAmount.toString(), "ether"),
      expirationTime: expirationTime,
    });

    const orderHash = getOrderHash(order);
    const signature = await signOrderHash(orderHash);

    const transactionHash = await seaport.fulfillOrder({
      order: { ...order, signature },
      accountAddress: account,
      feeMethod: 1,
      feeRecipientAddress: seaport._networkFeeRecipient,
      waitForConfirmation: true,
    });

    console.log(`Transaction hash: ${transactionHash}`);
    return transactionHash;
  } catch (error) {
    console.log(`Error making offer: ${error}`);
    throw error;
  }
}

function Offer(props) {
  const [isMakingOffer, setIsMakingOffer] = useState(false);
  const [offerResult, setOfferResult] = useState("");

  async function handleMakeOffer() {
    setIsMakingOffer(true);
    try {
      const transactionHash = await makeOffer(props.account, props.nftContractAddress, props.tokenId, props.offerAmount);
      setOfferResult(`Offer successfully made. Transaction hash: ${transactionHash}`);
    } catch (error) {
      setOfferResult("Failed to make offer.");
    }
    setIsMakingOffer(false);
  }

  return (
    <div>
      <button form='offerForm' type="submit" onClick={handleMakeOffer}>Make Offer</button>
      {isMakingOffer && <p>Making offer...</p>}
      {offerResult && <p>{offerResult}</p>}
    </div>
  );
}

export default Offer;
