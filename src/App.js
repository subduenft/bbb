import React, { useState } from "react";
import Login from "./components/Login";
import Form from "./components/Form";

function App() {
  const [account, setAccount] = useState(null);

  const handleLogin = (connectedAccount) => {
    setAccount(connectedAccount);
  };

  return (
    <div>
      <Login connectedAccount={account} onLogin={handleLogin} />
      {/* {account && <Offer account={account} />} */}
      <Form account={account} />
    </div>
  );
}

export default App;
