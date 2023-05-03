import React, { useState } from "react";
import { OpenSeaPort, Network, gasPrice } from "opensea-js";
import Web3 from "web3";
import { osApiKey, networkName, getContract, etherscanApiKey, web3instance } from "../DataContext";

const etherscanApi = etherscanApiKey();

export async function makeOffer(nftContractAddress, tokenId, offerAmount) {
  try {
    // Check if a MetaMask account is connected
    const provider = window.ethereum;
    if (!provider) {
      throw new Error("Please connect to MetaMask.");
    }

    // Prompt for MetaMask account connection
    await provider.request({ method: "eth_requestAccounts" });

    const web3 = web3instance();
    const seaport = new OpenSeaPort(web3.currentProvider, {
      networkName: Network.Main,
      apiKey: osApiKey(),
    });

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    console.log(account);
    console.log(nftContractAddress);
    console.log(tokenId);
    console.log(offerAmount);


    const offer = {
      asset: {
        tokenId: tokenId,
        tokenAddress: nftContractAddress,
      },
      fromAddress: account,
      toAddress: "0x0000000000000000000000000000000000000000",
      value: Web3.utils.toWei(offerAmount.toString(), "ether"),
      startAmount: Web3.utils.toWei(offerAmount.toString(), "ether"),
      quantity: 1,
      expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24 * 30),
    };


    async function getContractAbi(tokenContractAddress) {
    // const web3 = web3instance();
      var abi = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenContractAddress}&apikey=${etherscanApi}`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data.result); 
              return data.result;
          });
      // console.log(abi); 
      return abi;
    }

    const contractAbi = await getContractAbi(nftContractAddress);
    console.log(contractAbi); 
    const transferFromAbi = parsedAbi.find((abi) => abi.name === 'transferFrom');
    const encodedAbi = web3.eth.abi.encodeFunctionCall(transferFromAbi, [account, seaport._proxyAddress, tokenId]);





    const gasPrice = await web3.eth.getGasPrice();
    console.log(`Gas price: ${gasPrice}`);

    const estimatedGas = await web3.eth.estimateGas({
      to: nftContractAddress,
      from: account,
      data: encodedAbi,
      value: web3.utils.toWei(offerAmount, 'ether'),
      gasPrice: gasPrice,
    });
    console.log(`Estimated gas: ${estimatedGas}`);

    console.log(contractAbi); //
    console.log(gasPrice); //
    console.log(estimatedGas); //

    const transactionHash = await seaport.fulfillOrder({
      order: offer,
      accountAddress: account,
      feeMethod: 1,
      gasPrice: gasPrice,
      feeRecipientAddress: seaport._networkFeeRecipient,
      waitForConfirmation: true,
      estimatedGas: estimatedGas,
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
      <button onClick={handleMakeOffer}>Make Offer</button>
      {isMakingOffer && <p>Making offer...</p>}
      {offerResult && <p>{offerResult}</p>}
    </div>
  );
}

// export function OfferAndSignature(props) {
//   return <Offer account={props.account} nftContractAddress={props.nftContractAddress} tokenId={props.tokenId} offerAmount={props.offerAmount} />;
// }

export default Offer;
