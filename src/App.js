import React, { useState } from "react";
import Login from "./components/Login";
import Form from "./components/Form";
import Offer from "./components/Offer";
import ContractAbiFetcher from "./components/ContractAbiFetcher";

function App() {
  // const [connectedAddress, setConnectedAddress] = useState("");
  // const [connectedBalance, setConnectedBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (formData) => {
    // code to handle form submission and make offer
    // will be added to the Offer component
  };

  const [abi, setAbi] = useState(null);

  const handleAbiChange = (newAbi) => {
    setAbi(newAbi);
  };


  return (
    <div className="App">
      <Login
        // setConnectedAddress={setConnectedAddress}
        // setConnectedBalance={setConnectedBalance}
        setErrorMessage={setErrorMessage}
      />
      <Form onSubmit={handleSubmit} />
      <Offer />
      <ContractAbiFetcher contractAddress={abi}>
        {(abi) => <Offer abi={abi} />}
      </ContractAbiFetcher>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default App;
