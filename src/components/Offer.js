import React, { useState } from "react";
import { OpenSeaPort, Network, getOrderHash, signOrderHash, validate, transact } from "opensea-js";
import Web3 from "web3";
import { osApiKey, networkName, getContract, etherscanApiKey, web3instance } from "../DataContext";

const etherscanApi = etherscanApiKey();
const osApi = osApiKey();
const opensea = require('opensea-js');


export async function makeOffer(account, nftContractAddress, tokenId, offerAmount) {
  try {

    const web3 = web3instance();
    // console.log(web3.currentProvider);
    const seaport = await new opensea.OpenSeaPort(web3.currentProvider, {
      networkName: opensea.Network.Main,
      apiKey: osApi,
    });

    console.log(account);
    console.log(nftContractAddress);
    console.log(tokenId);
    console.log(offerAmount);

    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 30); // 30 days from now 
    const offerAmountInWei = Web3.utils.toWei(offerAmount.toString(), "ether");

    // Check if the user has approved the contract to spend their token
    const approvedAmount = await seaport.getTokenBalance({
      accountAddress: account,
      tokenAddress: nftContractAddress,
      tokenId: tokenId,
    });

    console.log(approvedAmount);

    if (approvedAmount.toNumber() < offerAmountInWei) {
      // If the approved amount is less than the offer amount, request approval from the user
      await seaport.approveOrder({
        asset: {
          tokenId: tokenId,
          tokenAddress: nftContractAddress,
        },
        accountAddress: account,
        proxyAddress: seaport._networkProxyAddress,
        startAmount: offerAmountInWei,
      });
    }

    // Create and execute the order
    const order = await seaport.createBuyOrder({
      asset: {
        tokenId: tokenId,
        tokenAddress: nftContractAddress,
      },
      accountAddress: account,
      startAmount: offerAmountInWei,
      expirationTime: expirationTime,
    });

    const validated = await seaport.validate([order]);
    const transaction = await validated.transact();
    console.log('Transaction hash: ', await transaction.wait());

    return transaction.hash;
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
