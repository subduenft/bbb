import React, { useEffect, useState } from 'react';
import Offer, { makeOffer } from "./Offer";

function Form(props) {
  const [nftContractAddress, setNftContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [offerAmount, setOfferAmount] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(props.account);

    makeOffer(props.account, nftContractAddress, tokenId, offerAmount);
  };



  return (
    <div>
      <form id="offerForm" onSubmit={handleSubmit}>
        <label>
          NFT Contract Address:
          <input type="text" value={nftContractAddress} onChange={(e) => setNftContractAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Token ID:
          <input type="text" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
        </label>
        <br />
        <label>
          Offer Amount:
          <input type="text" value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} /> 
        </label>
        <br />
        {/* <button type="submit" >Make Offer</button> */}
      </form>
      
    
      <Offer account={props.account} nftContractAddress={nftContractAddress} tokenId={tokenId} offerAmount={offerAmount}/>
    </div>
  );
  
}

export default Form;
