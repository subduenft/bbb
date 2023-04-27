import React, { useState } from 'react';

function Form(props) {
  const [nftContractAddress, setNftContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [offerAmount, setOfferAmount] = useState('');

  const handleNftContractAddressChange = (event) => {
    setNftContractAddress(event.target.value);
  };

  const handleTokenIdChange = (event) => {
    setTokenId(event.target.value);
  };

  const handleOfferAmountChange = (event) => {
    setOfferAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      nftContractAddress,
      tokenId,
      offerAmount
    };
    props.onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        NFT Contract Address:
        <input type="text" value={nftContractAddress} onChange={handleNftContractAddressChange} />
      </label>
      <br />
      <label>
        Token ID:
        <input type="text" value={tokenId} onChange={handleTokenIdChange} />
      </label>
      <br />
      <label>
        Offer Amount:
        <input type="text" value={offerAmount} onChange={handleOfferAmountChange} />
      </label>
      <br />
      <button type="submit">Make Offer</button>
    </form>
  );
}

export default Form;
