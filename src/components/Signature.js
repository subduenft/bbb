import React, { useState } from 'react';
import Web3 from 'web3';
import { createOrder } from 'opensea-js';

const Signature = ({ web3, seaport, tokenId, offerAmount, contractAddress, accountAddress, onSuccess, onError }) => {
  const [signature, setSignature] = useState('');

  const signAndSend = async () => {
    try {
      const order = await seaport.createOrder({
        asset: {
          tokenId: tokenId,
          tokenAddress: contractAddress,
          schemaName: 'ERC721'
        },
        accountAddress: accountAddress,
        startAmount: offerAmount,
        expirationTime: 0,
        paymentTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
      });

      const { hash } = await web3.eth.accounts.sign(
        order.hash,
        '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
      );
      setSignature(hash);

      const signedOrder = await seaport.signOrder(order, false, hash);
      const confirmedOrder = await seaport.validateAndPostOrder(signedOrder);
      onSuccess(confirmedOrder);

    } catch (error) {
      console.error(error);
      // error(error);
    }
  };

  return (
    <div>
      <button onClick={signAndSend}>Sign and Submit Offer</button>
      {signature && <p>Signature: {signature}</p>}
    </div>
  );
};

export default Signature;
