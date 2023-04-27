import { useState, useEffect } from "react";
import Web3 from "web3";
// import {nftContractAddress} from "Form"

const ContractAbiFetcher = ({ contractAddress, children }) => {
  const [abi, setAbi] = useState(null);

  useEffect(() => {
    const fetchAbi = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract([], contractAddress);
        const contractAbi = await contract.methods._jsonInterface;
        setAbi(JSON.parse(contractAbi));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAbi();
  }, [contractAddress]);

  return children(abi);
};

export default ContractAbiFetcher;
