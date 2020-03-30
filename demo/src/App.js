import React, { useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";

import client from "./graphql/client";
import User from "./components/User/User";
import { GRAPHQL, FETCH } from "./components/constants";

function App() {
  const [mode, setMode] = useState(GRAPHQL);
  const updateMode = () => {
    const newMode = mode === GRAPHQL ? FETCH : GRAPHQL;
    setMode(newMode);
  };
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <button onClick={updateMode}>{mode}</button>
        </header>
        <main>
          <User mode={mode} />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
