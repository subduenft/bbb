import React, { useState, useContext, useEffect } from 'react';
import wethAbi from './jsons/wethAbi.json';

const DataContext = React.createContext();

const network = "mainnet";
const infuraApi = "28d9ffd80cb04b8cb488e64060f0e3fe";
const osApi = "d6a557dceac44623aad26ec5f7bf01e4";
const etherscanApi = "P8W2T28NAY6KJSIERU7TB92WY4NV4916CN";
const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";


export function web3instance () {
    var Web3 = require('web3');
    var web3 = new Web3(`https://${network}.infura.io/v3/${infuraApi}`);
    return web3;
}

export function wethTokenAddress () {
    return wethAddress;
}

export function getContract(tokenContractAddress) {
    const web3 = web3instance();
    const abi = wethAbi;
    let contract = new web3.eth.Contract(abi, tokenContractAddress);
    return contract;
}

export function etherscanApiKey () {
    return etherscanApi;
}

// export async function getContractAbi(tokenContractAddress) {
//     // const web3 = web3instance();
//     const abi = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenContractAddress}&apikey=${etherscanApi}`)
//         .then((response) => response.json())
//         .then((data) => {
//            console.log(data.result); 
//             return data.result;
//         });
//     console.log(abi); 
//     return abi;
// }

export function osApiKey () {
    return osApi;
}

export function networkName () {
    return network;
}








export function DataProvider ({ children }) {


    return (
        <DataContext.Provider >
            {children}
        </DataContext.Provider>
    )
}