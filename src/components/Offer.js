import React, { useState } from "react";
import { OpenSeaPort, getOrderHashHex } from "opensea-js";
import Web3 from "web3";
import Signature from "./Signature";
import ContractAbiFetcher from "./ContractAbiFetcher";

const osApiKey = "d6a557dceac44623aad26ec5f7bf01e4";

const Offer = ({ contractAddress, tokenId, offerAmount, walletAddress, network, contractAbi }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const provider = new Web3.providers.HttpProvider(`https://${network}.infura.io/v3/28d9ffd80cb04b8cb488e64060f0e3fe`);
  const seaport = new OpenSeaPort(provider, {
    networkName: network,
    apiKey: osApiKey,
  });
  // const contract = new seaport.web3.eth.Contract(contractAbi, contractAddress);

  const handleOffer = async (signature) => {
    setIsLoading(true);

    try {
      const order = {
        asset: {
          tokenId,
          tokenAddress: contractAddress,
        },
        assetBundle: null,
        maker: walletAddress,
        taker: "0x0000000000000000000000000000000000000000",
        quantity: "1",
        exchange: seaport._getExchangeContractAddress(),
        startDate: null,
        endDate: null,
        paymentTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        basePrice: offerAmount,
        extra: {},
      };

      const orderHash = getOrderHashHex(order);
      const signedOrder = await seaport._signOrderAsync(orderHash, walletAddress, signature);

      const transactionHash = await seaport.fulfillOrderAsync(signedOrder);
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isSuccess) {
    return <p>Offer successfully submitted!</p>;
  }

  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }

  return <Signature onSignature={handleOffer} />;
};

export default Offer;
